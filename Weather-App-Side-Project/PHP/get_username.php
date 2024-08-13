<?php
include '../PHP/database.php'; // This will be used if you need database connection
session_start(); // Start the session

header('Content-Type: application/json'); // Specify the content type as JSON

// Check if the username is set in the session and output it, otherwise output "Guest"
if (isset($_SESSION['username'])) {
    echo json_encode(array("username" => $_SESSION['username']));
} else {
    echo json_encode(array("username" => "Guest"));
}

