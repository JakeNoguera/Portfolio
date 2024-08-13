<?php
session_start(); // Start the session first to prevent headers already sent error

// Include the database connection
include '../PHP/database.php'; // This should now contain a MySQLi connection

// Check if user input from the form is set
if (isset($_POST['new-username'], $_POST['email'], $_POST['new-password'], $_POST['confirm-password'])) {
    // Escape the user input to prevent SQL Injection
    $username = mysqli_real_escape_string($conn, $_POST['new-username']);
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $password = $_POST['new-password'];
    $confirm_password = $_POST['confirm-password'];

    // Check if the two passwords match
    if ($password !== $confirm_password) {
        echo "Passwords do not match.";
        exit;
    }

    // Hash the password
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    // Prepare an insert statement
    $sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)"; // Using lowercase for 'password'

    // Create a prepared statement
    if ($stmt = $conn->prepare($sql)) {
        // Bind the parameters to the statement
        $stmt->bind_param("sss", $username, $email, $hashed_password);

        // Execute the statement
        if ($stmt->execute()) {
            // Redirect to index.html after successful registration
            header('Location: ../HTML/index.html?signup=success');
            exit; // Ensure no further code is executed after redirection
        } else {
            echo "Error: " . $stmt->error;
        }

        // Close statement
        $stmt->close();
    } else {
        die("Error preparing the statement: " . $conn->error);
    }
} else {
    echo "Error: Not all form fields were sent.";
    exit;
}

// Close connection
$conn->close();