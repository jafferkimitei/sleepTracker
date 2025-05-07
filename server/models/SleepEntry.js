

const mongoose = require('mongoose');

const SleepEntrySchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  sleepTime: {
    type: String,
    required: true,
  },
  wakeUpTime: {
    type: String,
    required: true,
  },
  sleepDuration: {
    type: Number, 
    required: true,
  },
  // userId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User'
  // }
}, { timestamps: true });

module.exports = mongoose.model('SleepEntry', SleepEntrySchema);
