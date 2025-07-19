<?php
// create_table.php
require 'db.php';

$sql = "CREATE TABLE IF NOT EXISTS stb_devices (
    id SERIAL PRIMARY KEY,
    serial_number TEXT UNIQUE,
    model TEXT,
    firmware_version TEXT,
    status TEXT,
    last_seen TIMESTAMP
)";

$pdo->exec($sql);
echo "Table 'stb_devices' created successfully.";
?>
