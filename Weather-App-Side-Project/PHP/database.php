<?php
// db.php or database.php
$servername = "localhost";
$dbUsername = "id21978526_jake";
$dbPassword = "@Jgamer23812";
$dbname = "id21978526_user_info";

// Create connection using MySQLi
$conn = new mysqli($servername, $dbUsername, $dbPassword, $dbname);

// Check connection
if ($conn->connect_error) {
    die("ERROR: Could not connect. " . $conn->connect_error);
}

