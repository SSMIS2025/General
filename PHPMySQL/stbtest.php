<?php
// Connection setup
$host = 'localhost';
$user = 'youruser';
$password = 'yourpassword';
$database = 'yourdb';
$port = 3306;

$conn = mysqli_connect($host, $user, $password, $database, $port);
if (!$conn) {
    die("❌ Connection failed: " . mysqli_connect_error());
}

// Create table
$createQuery = "
CREATE TABLE IF NOT EXISTS stb_devices (
  id INT AUTO_INCREMENT PRIMARY KEY,
  serial_number VARCHAR(255) UNIQUE,
  model VARCHAR(255),
  firmware_version VARCHAR(50),
  status VARCHAR(20),
  last_seen DATETIME
);
";
mysqli_query($conn, $createQuery);
echo "✅ Table 'stb_devices' ensured.\n";

// Helper to generate fake STB data
function generateFakeSTB($index) {
    return [
        'serial_number' => "STB{$index}_" . rand(1000, 9999),
        'model' => "Model_" . rand(100, 999),
        'firmware_version' => 'v' . rand(0, 2) . '.' . rand(0, 9) . '.' . rand(0, 9),
        'status' => 'online',
        'last_seen' => date('Y-m-d H:i:s'),
    ];
}

// Bulk insert
function insertBatch($conn, $batch) {
    $values = [];

    foreach ($batch as $stb) {
        $serial = mysqli_real_escape_string($conn, $stb['serial_number']);
        $model = mysqli_real_escape_string($conn, $stb['model']);
        $fw = mysqli_real_escape_string($conn, $stb['firmware_version']);
        $status = mysqli_real_escape_string($conn, $stb['status']);
        $seen = mysqli_real_escape_string($conn, $stb['last_seen']);

        $values[] = "('$serial', '$model', '$fw', '$status', '$seen')";
    }

    $sql = "INSERT IGNORE INTO stb_devices (serial_number, model, firmware_version, status, last_seen) VALUES " . implode(',', $values);
    mysqli_query($conn, $sql);
}

// Main insert loop
$total = 1000000;
$batchSize = 5000;

echo "🚀 Starting insert of $total records...\n";
$start = microtime(true);

for ($i = 0; $i < $total; $i += $batchSize) {
    $batch = [];
    for ($j = 0; $j < $batchSize; $j++) {
        $batch[] = generateFakeSTB($i + $j);
    }
    insertBatch($conn, $batch);
    echo "✅ Inserted " . ($i + $batchSize) . " records\n";
}

$end = microtime(true);
echo "🎉 Done inserting 1 million records in " . round($end - $start, 2) . " seconds\n";

// Select timing
echo "🔍 Selecting all STB records...\n";
$selectStart = microtime(true);
$result = mysqli_query($conn, "SELECT * FROM stb_devices");
$count = mysqli_num_rows($result);
$selectEnd = microtime(true);
echo "📊 Selected $count records in " . round($selectEnd - $selectStart, 2) . " seconds\n";

// Show first 5
$printed = 0;
while ($row = mysqli_fetch_assoc($result)) {
    if ($printed++ < 5) {
        print_r($row);
    }
}
mysqli_free_result($result);

// Close connection
mysqli_close($conn);
