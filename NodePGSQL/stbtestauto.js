const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  user: 'youruser',
  password: 'yourpassword',
  database: 'yourdb',
  port: 5432,
});

async function createTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS stb_devices (
      id SERIAL PRIMARY KEY,
      serial_number TEXT UNIQUE,
      model TEXT,
      firmware_version TEXT,
      status TEXT,
      last_seen TIMESTAMP
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
    last_seen: new Date().toISOString(),
  };
}

async function insertBatch(batch) {
  const values = [];
  const params = [];

  batch.forEach((stb, i) => {
    const offset = i * 5;
    values.push(`($${offset + 1}, $${offset + 2}, $${offset + 3}, $${offset + 4}, $${offset + 5})`);
    params.push(
      stb.serial_number,
      stb.model,
      stb.firmware_version,
      stb.status,
      stb.last_seen
    );
  });

  const query = `
    INSERT INTO stb_devices (serial_number, model, firmware_version, status, last_seen)
    VALUES ${values.join(', ')}
  `;

  await pool.query(query, params);
}

async function selectAllSTBs() {
  console.log("🔍 Selecting all STB records...");
  const start = Date.now();
  const result = await pool.query('SELECT * FROM stb_devices');
  const end = Date.now();
  console.log(`📊 Selected ${result.rowCount} records in ${(end - start) / 1000} seconds`);
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
