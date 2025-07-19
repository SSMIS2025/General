// 📦 Install before using: npm install pg faker

const { Pool } = require('pg');
const faker = require('faker');
const { performance } = require('perf_hooks');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'youruser',
  password: 'yourpassword',
  database: 'yourdb',
  max: 20,
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
}

function generateFakeSTBRecords(count) {
  const records = [];
  for (let i = 0; i < count; i++) {
    records.push([
      faker.datatype.uuid(),
      faker.commerce.productName(),
      'v' + faker.system.semver(),
      'online',
      new Date().toISOString()
    ]);
  }
  return records;
}

async function bulkInsertSTBs(records) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const values = [];
    const params = [];

    for (let i = 0; i < records.length; i++) {
      const baseIndex = i * 5;
      values.push(`($${baseIndex + 1}, $${baseIndex + 2}, $${baseIndex + 3}, $${baseIndex + 4}, $${baseIndex + 5})`);
      params.push(...records[i]);
    }

    const query = `
      INSERT INTO stb_devices (serial_number, model, firmware_version, status, last_seen)
      VALUES ${values.join(', ')}
    `;

    await client.query(query, params);
    await client.query('COMMIT');
  } catch (err) {
    console.error('Insert failed:', err);
    await client.query('ROLLBACK');
  } finally {
    client.release();
  }
}

async function insertMillionSTBs() {
  const batchSize = 5000;
  const totalRecords = 1000000;
  const start = performance.now();

  for (let i = 0; i < totalRecords; i += batchSize) {
    const batch = generateFakeSTBRecords(batchSize);
    await bulkInsertSTBs(batch);
    console.log(`Inserted ${i + batchSize} records...`);
  }

  const end = performance.now();
  console.log(`Total Insert Time: ${((end - start) / 1000).toFixed(2)} seconds`);
}

async function selectAllSTBs() {
  const start = performance.now();
  const result = await pool.query('SELECT * FROM stb_devices');
  const end = performance.now();
  console.log(`Selected ${result.rowCount} records in ${((end - start) / 1000).toFixed(2)} seconds`);
}

async function main() {
  await createTable();
  await insertMillionSTBs();
  await selectAllSTBs();
  await pool.end();
}

main().catch(console.error);
