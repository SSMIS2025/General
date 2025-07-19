<?php
// select_all.php - Select and show total count + duration
require 'db.php';

$start = microtime(true);
$stmt = $pdo->query("SELECT * FROM stb_devices");
$records = $stmt->fetchAll(PDO::FETCH_ASSOC);
$end = microtime(true);

echo "<h2>Selected " . count($records) . " records</h2>";
echo "<p>Time taken: " . round($end - $start, 2) . " seconds</p>";
?>
