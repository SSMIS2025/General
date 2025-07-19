const mongoose = require('mongoose');

const uri = 'mongodb://localhost:27017/yourdb';

const STBSchema = new mongoose.Schema({
  serial_number: { type: String, unique: true, index: true },
  model: String,
  firmware_version: String,
  status: String,
  last_seen: { type: Date, index: true }
});

const STB = mongoose.model('STBDevice', STBSchema);

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
  try {
    await STB.insertMany(batch, { ordered: false });
  } catch (err) {
    // Ignore duplicate key errors if any
    if (err.code !== 11000) {
      console.error("❌ Insert Error:", err);
    }
  }
}

async function runTest() {
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  // Clean previous records
  await STB.deleteMany({});
  console.log("🧹 Cleared previous STB records");

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

  const insertEnd = Date.now();
  console.log(`🎉 Done inserting 1 million records in ${(insertEnd - start) / 1000} seconds`);

  // Count and report
  console.log("🔍 Counting records...");
  const countStart = Date.now();
  const count = await STB.countDocuments();
  const countEnd = Date.now();
  console.log(`📊 Found ${count} records in ${(countEnd - countStart) / 1000} seconds`);

  await mongoose.disconnect();
}

runTest().catch(console.error);
