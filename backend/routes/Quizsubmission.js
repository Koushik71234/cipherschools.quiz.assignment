const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const TestResultModel = require('../models/TestResult.js'); // Adjust path as necessary

router.post('/submit-quiz', (req, res) => {
  const { userId, answers } = req.body;

  // Validate userId format
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: 'Invalid userId format' });
  }

  TestResultModel.create({ userId, answers })
    .then(testResult => res.json(testResult))
    .catch(err => res.status(500).json({ error: err.message }));
});

module.exports = router;


