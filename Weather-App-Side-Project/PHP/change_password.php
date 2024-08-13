<?php
session_start();

// Check if the user is logged in
if (!isset($_SESSION['user_id'])) {
    header('Location: ../HTML/index.html');
    exit();
}

// Include the MySQLi database connection file
include '../PHP/database.php'; // Make sure this path is correct and the file sets up $conn with MySQLi

// Function to verify the current password
function verifyCurrentPassword($userId, $currentPassword) {
    global $conn; // Use the MySQLi connection
    $sql = "SELECT password FROM users WHERE id = ?";
    
    if ($stmt = $conn->prepare($sql)) {
        $stmt->bind_param("i", $userId);
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($result->num_rows === 1) {
            $user = $result->fetch_assoc();
            // Verify the password against the hash stored in the database
            return password_verify($currentPassword, $user['password']);
        }
    }
    return false; // User not found or password does not match
}

// Function to update the user's password
function updateUserPassword($userId, $hashedPassword) {
    global $conn; // Use the MySQLi connection
    $sql = "UPDATE users SET password = ? WHERE id = ?";
    
    if ($stmt = $conn->prepare($sql)) {
        $stmt->bind_param("si", $hashedPassword, $userId);
        return $stmt->execute(); // Returns true on success
    }
    return false; // Return false if the statement could not be prepared
}

// Check if the password change form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $user_id = $_SESSION['user_id'];
    $current_password = $_POST['current_password'];
    $new_password = $_POST['new_password'];
    $confirm_new_password = $_POST['confirm_new_password'];

    // Validate the current and new passwords
    $isCurrentPasswordCorrect = verifyCurrentPassword($user_id, $current_password);
    $doPasswordsMatch = ($new_password === $confirm_new_password);

    if ($isCurrentPasswordCorrect && $doPasswordsMatch) {
        // Hash the new password
        $hashed_password = password_hash($new_password, PASSWORD_DEFAULT);
        
        // Attempt to update the password in the database
        if (updateUserPassword($user_id, $hashed_password)) {
            // Regenerate the session ID to prevent session fixation attacks
            session_regenerate_id(true);

            // Destroy the session and log the user out
            $_SESSION = array();
            if (ini_get("session.use_cookies")) {
                $params = session_get_cookie_params();
                setcookie(session_name(), '', time() - 42000,
                    $params["path"], $params["domain"],
                    $params["secure"], $params["httponly"]
                );
            }
            session_destroy();

            // Redirect to the login page with a success message
            header('Location: ../HTML/index.html?message=password_changed');
            exit();
        } else {
            // If there was a problem updating the password, redirect to the profile page with an error message
            header('Location: ../PHP/profile.php?passwordChange=error');
            exit();
        }
    } else {
        // If the current password is incorrect or the new passwords don't match, redirect with an error message
        header('Location: ../PHP/profile.php?passwordChange=validation_error');
        exit();
    }
}


