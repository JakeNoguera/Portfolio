<?php
session_start(); // Start the session first to be able to use session variables

// Include your database connection
include '../PHP/database.php'; // This will now contain a MySQLi connection

// Initialize an error message variable
$errorMsg = "";

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['email']) && isset($_POST['password'])) {
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Prepare a select statement to fetch user details using MySQLi
    $sql = "SELECT id, username, email, password FROM users WHERE email = ?";

    if ($stmt = $conn->prepare($sql)) {
        // Bind variables to the prepared statement as parameters
        $stmt->bind_param("s", $email);

        // Attempt to execute the prepared statement
        if ($stmt->execute()) {
            // Store result to get properties like $stmt->num_rows
            $stmt->store_result();

            // Check if email exists, if yes then verify password
            if ($stmt->num_rows == 1) {
                // Bind result variables
                $stmt->bind_result($id, $username, $userEmail, $hashed_password);
                $stmt->fetch();
                
                if (password_verify($password, $hashed_password)) {
                    // Store data in session variables
                    $_SESSION["loggedin"] = true;
                    $_SESSION["user_id"] = $id; // Ensure you use the correct session variable name here
                    $_SESSION["username"] = $username;
                    $_SESSION["email"] = $userEmail;
                
                    header("location: ../HTML/homepage.html"); // Redirect to the homepage
                    exit;
                } else {
                    $errorMsg = "The password you entered was not valid.";
                }
            } else {
                $errorMsg = "No account found with that email.";
            }
        } else {
            $errorMsg = "Oops! Something went wrong. Please try again later.";
        }
        // Close statement
        $stmt->close();
    } else {
        $errorMsg = "Error preparing the statement: " . $conn->error;
    }
}

// Check if there was an error and display it
if ($errorMsg) {
    // If the session was not started yet, start it here
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }
    $_SESSION['error_message'] = $errorMsg;
    header("location: ../PHP/errorPage.php"); // Redirect to an error page
    exit;
}