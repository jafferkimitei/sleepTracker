

const express = require('express');
const router = express.Router();
const {
  getAllSleepEntries,
  createSleepEntry,
  updateSleepEntry,
  deleteSleepEntry,
  getAverageSleepDuration,
  getLongestSleepStreak
} = require('../controllers/sleepController');

const { protect } = require('../middleware/authMiddleware');


// GET all entries
router.get('/', getAllSleepEntries);

// POST a new entry
router.post('/', createSleepEntry);

// PUT update entry by ID
router.put('/:id', updateSleepEntry);

// DELETE entry by ID
router.delete('/:id', deleteSleepEntry);
router.route('/').get(protect, getAllSleepEntries).post(protect, createSleepEntry);

// Get sleep analytics
router.route('/analytics/average/:period').get(protect, getAverageSleepDuration);
router.route('/analytics/longest-streak').get(protect, getLongestSleepStreak);

module.exports = router;
