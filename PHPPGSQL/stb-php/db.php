<?php
// db.php - PostgreSQL connection
$host = "localhost";
$db   = "yourdb";
$user = "youruser";
$pass = "yourpassword";
$port = "5432";

try {
    $pdo = new PDO("pgsql:host=$host;port=$port;dbname=$db", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("DB connection failed: " . $e->getMessage());
}
?>
