<?php
session_start();
if (!isset($_SESSION['user_id'])) {
    // Redirect to login page if not logged in
    header('Location: ../HTML/index.html');
    exit();
}

// Assume user's information is stored in session variables
// In a real application, you'd fetch this information from your database
$userInfo = [
    'username' => $_SESSION['username'],
    'email' => $_SESSION['email']
];

// Pass $userInfo to the HTML template
include('../HTML/profile.html');
