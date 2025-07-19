<?php
// insert_batch.php - Inserts 1 million STB records in batches
require 'db.php';

function generateFakeSTB($index) {
    $serial = uniqid("STB{$index}_");
    $model = "Model_" . rand(100, 999);
    $firmware = "v" . rand(1, 3) . "." . rand(0, 9) . "." . rand(0, 9);
    $status = 'online';
    $last_seen = date('Y-m-d H:i:s');
    return [$serial, $model, $firmware, $status, $last_seen];
}

$batchSize = 5000;
$totalRecords = 1000000;

$start = microtime(true);

for ($i = 0; $i < $totalRecords; $i += $batchSize) {
    $pdo->beginTransaction();
    $sql = "INSERT INTO stb_devices (serial_number, model, firmware_version, status, last_seen)
            VALUES ";

    $params = [];
    $placeholders = [];

    for ($j = 0; $j < $batchSize; $j++) {
        $record = generateFakeSTB($i + $j);
        $placeholders[] = "(" . implode(",", array_fill(0, 5, "?")) . ")";
        $params = array_merge($params, $record);
    }

    $sql .= implode(",", $placeholders);

    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $pdo->commit();

    echo "Inserted " . ($i + $batchSize) . " records...\n";
}

$end = microtime(true);
echo "Total Insert Time: " . round($end - $start, 2) . " seconds.";
?>
