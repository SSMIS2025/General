<?php
require 'vendor/autoload.php';

use MongoDB\Client;
use MongoDB\BSON\UTCDateTime;

// Setup MongoDB
$client = new Client("mongodb://localhost:27017");
$collection = $client->yourdb->stb_devices;

// Define index creation
$collection->createIndex(['serial_number' => 1], ['unique' => true]);
$collection->createIndex(['last_seen' => -1]);

// Helper to generate fake STB
function generateFakeSTB($index) {
    return [
        'serial_number' => "STB{$index}_" . rand(1000, 9999),
        'model' => "Model_" . rand(100, 999),
        'firmware_version' => 'v' . rand(0, 2) . '.' . rand(0, 9) . '.' . rand(0, 9),
        'status' => 'online',
        'last_seen' => new UTCDateTime(),
    ];
}

// Clean up previous records
$collection->deleteMany([]);
echo "🧹 Cleared previous records\n";

// Insert 1 million records in batches
$total = 1000000;
$batchSize = 5000;
$start = microtime(true);

for ($i = 0; $i < $total; $i += $batchSize) {
    $batch = [];
    for ($j = 0; $j < $batchSize; $j++) {
        $batch[] = generateFakeSTB($i + $j);
    }

    try {
        $collection->insertMany($batch, ['ordered' => false]);
        echo "✅ Inserted " . ($i + $batchSize) . " records\n";
    } catch (Exception $e) {
        echo "⚠️ Insert error at batch " . ($i / $batchSize) . ": " . $e->getMessage() . "\n";
    }
}

$end = microtime(true);
echo "🎉 Done inserting 1 million records in " . round($end - $start, 2) . " seconds\n";

// Count records
$selectStart = microtime(true);
$count = $collection->countDocuments();
$selectEnd = microtime(true);

echo "📊 Total records: $count (selected in " . round($selectEnd - $selectStart, 2) . " seconds)\n";
