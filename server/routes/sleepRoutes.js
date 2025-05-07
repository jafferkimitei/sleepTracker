

const express = require('express');
const router = express.Router();
const {
  getAllSleepEntries,
  createSleepEntry,
  updateSleepEntry,
  deleteSleepEntry,
} = require('../controllers/sleepController');

// GET all entries
router.get('/', getAllSleepEntries);

// POST a new entry
router.post('/', createSleepEntry);

// PUT update entry by ID
router.put('/:id', updateSleepEntry);

// DELETE entry by ID
router.delete('/:id', deleteSleepEntry);

module.exports = router;
