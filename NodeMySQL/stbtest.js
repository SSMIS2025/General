const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'youruser',
  password: 'yourpassword',
  database: 'yourdb',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
});

async function createTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS stb_devices (
      id INT AUTO_INCREMENT PRIMARY KEY,
      serial_number VARCHAR(255) UNIQUE,
      model VARCHAR(255),
      firmware_version VARCHAR(50),
      status VARCHAR(20),
      last_seen DATETIME
    );
  `);
  console.log("✅ Table 'stb_devices' ensured.");
}

function generateFakeSTB(index) {
  return {
    serial_number: `STB${index}_${Math.floor(Math.random() * 10000)}`,
    model: `Model_${Math.floor(Math.random() * 1000)}`,
    firmware_version: `v${Math.floor(Math.random() * 3)}.${Math.floor(Math.random() * 10)}.${Math.floor(Math.random() * 10)}`,
    status: 'online',
    last_seen: new Date(),
  };
}

async function insertBatch(batch) {
  const values = batch.map(stb => [
    stb.serial_number,
    stb.model,
    stb.firmware_version,
    stb.status,
    stb.last_seen,
  ]);

  const query = `
    INSERT INTO stb_devices (serial_number, model, firmware_version, status, last_seen)
    VALUES ?
  `;

  await pool.query(query, [values]);
}

async function selectAllSTBs() {
  console.log("🔍 Selecting all STB records...");
  const start = Date.now();
  const [rows] = await pool.query('SELECT * FROM stb_devices');
  const end = Date.now();
  console.log(`📊 Selected ${rows.length} records in ${(end - start) / 1000} seconds`);

  // Display first 5 rows as sample
  console.log("\n🖨️ First 5 STBs:");
  rows.slice(0, 5).forEach((row, i) => {
    console.log(`#${i + 1}:`, row);
  });
}

async function runTest() {
  await createTable();

  const total = 1_000_000;
  const batchSize = 5000;

  console.log(`🚀 Starting insert of ${total} records...`);
  const start = Date.now();

  for (let i = 0; i < total; i += batchSize) {
    const batch = [];
    for (let j = 0; j < batchSize; j++) {
      batch.push(generateFakeSTB(i + j));
    }
    await insertBatch(batch);
    console.log(`✅ Inserted ${i + batchSize} records`);
  }

  const end = Date.now();
  console.log(`🎉 Done inserting 1 million records in ${(end - start) / 1000} seconds`);

  await selectAllSTBs();
  await pool.end();
}

runTest().catch(err => {
  console.error('❌ Error:', err);
});
