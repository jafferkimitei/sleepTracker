

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


// analtics of sleep
// Get average sleep duration for the past week or month
exports.getAverageSleepDuration = async (req, res) => {
    const { period } = req.params; // period can be "week" or "month"
    const now = new Date();
    let startDate;
  
    if (period === "week") {
      startDate = new Date(now.setDate(now.getDate() - 7));
    } else if (period === "month") {
      startDate = new Date(now.setMonth(now.getMonth() - 1));
    } else {
      return res.status(400).json({ message: "Invalid period, use 'week' or 'month'" });
    }
  
    try {
      const average = await Sleep.aggregate([
        { $match: { date: { $gte: startDate } } },
        {
          $addFields: {
            sleepDuration: {
              $dateDiff: {
                startDate: { $dateFromString: { dateString: "$sleepTime" } },
                endDate: { $dateFromString: { dateString: "$wakeUpTime" } },
                unit: "minute",
              },
            },
          },
        },
        { $group: { _id: null, avgDuration: { $avg: "$sleepDuration" } } },
      ]);
  
      res.status(200).json({ averageDuration: average[0]?.avgDuration || 0 });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };
// Get the longest streak of 8+ hour sleep
exports.getLongestSleepStreak = async (req, res) => {
    try {
      const streak = await Sleep.aggregate([
        {
          $addFields: {
            sleepDuration: {
              $dateDiff: {
                startDate: { $dateFromString: { dateString: "$sleepTime" } },
                endDate: { $dateFromString: { dateString: "$wakeUpTime" } },
                unit: "minute",
              },
            },
          },
        },
        { $match: { sleepDuration: { $gte: 480 } } }, // Filter entries with 8+ hours (480 minutes)
        {
          $group: {
            _id: null,
            longestStreak: { $max: "$date" },
          },
        },
      ]);
  
      res.status(200).json({ longestStreak: streak[0]?.longestStreak || "No streak found" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };
    