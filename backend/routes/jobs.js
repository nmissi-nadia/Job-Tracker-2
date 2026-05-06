const express = require('express');
const Job = require('../models/Job');
const router = express.Router();

router.get('/', async (req, res) => {
  const jobs = await Job.findAll();
  res.json(jobs);
});

router.post('/', async (req, res) => {
  const job = await Job.create(req.body);
  res.json(job);
});

module.exports = router;
