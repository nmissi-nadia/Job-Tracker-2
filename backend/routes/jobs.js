const express = require('express');
const { Job, Application } = require('../models');
const auth = require('../middleware/auth');
const router = express.Router();

// Get all jobs for the logged-in user
router.get('/', auth, async (req, res) => {
  try {
    const jobs = await Job.findAll({
      where: { userId: req.user.id },
      include: [Application],
      order: [['createdAt', 'DESC']]
    });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new job
router.post('/', auth, async (req, res) => {
  try {
    const { title, company, link, skills } = req.body;
    const job = await Job.create({
      title,
      company,
      link,
      skills,
      userId: req.user.id
    });
    res.status(201).json(job);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update a job
router.put('/:id', auth, async (req, res) => {
  try {
    const job = await Job.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (!job) return res.status(404).json({ error: 'Job not found' });

    await job.update(req.body);
    res.json(job);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a job
router.delete('/:id', auth, async (req, res) => {
  try {
    const job = await Job.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (!job) return res.status(404).json({ error: 'Job not found' });

    await job.destroy();
    res.json({ message: 'Job deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
