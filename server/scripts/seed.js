const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Sleep = require('../models/sleepEntry');

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const sleepData = [
  {
    date: '2025-05-01',
    sleepTime: '22:00',
    wakeUpTime: '06:00',
    sleepDuration: 480,
  },
  {
    date: '2025-05-02',
    sleepTime: '23:00',
    wakeUpTime: '07:00',
    sleepDuration: 480,
  },
  {
    date: '2025-05-03',
    sleepTime: '22:30',
    wakeUpTime: '06:15',
    sleepDuration: 465,
  },
];

const seedSleepData = async () => {
  try {
    await Sleep.deleteMany();
    await Sleep.insertMany(sleepData);
    console.log('Sleep data seeded');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedSleepData();
