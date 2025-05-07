

const SleepEntry = require('../models/SleepEntry');

// @desc    Get all sleep entries
// @route   GET /api/sleep
exports.getAllSleepEntries = async (req, res) => {
  try {
    const entries = await SleepEntry.find().sort({ createdAt: -1 });
    res.status(200).json(entries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc    Create a new sleep entry
// @route   POST /api/sleep
exports.createSleepEntry = async (req, res) => {
  const { date, sleepTime, wakeUpTime, sleepDuration } = req.body;

  try {
    const newEntry = new SleepEntry({
      date,
      sleepTime,
      wakeUpTime,
      sleepDuration,
    });

    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// @desc    Update a sleep entry
// @route   PUT /api/sleep/:id
exports.updateSleepEntry = async (req, res) => {
  const { id } = req.params;

  try {
    const updated = await SleepEntry.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ message: 'Sleep entry not found' });
    }

    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// @desc    Delete a sleep entry
// @route   DELETE /api/sleep/:id
exports.deleteSleepEntry = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await SleepEntry.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Sleep entry not found' });
    }

    res.status(200).json({ message: 'Sleep entry deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
