const express = require('express');
const { Application, Job } = require('../models');
const auth = require('../middleware/auth');
const router = express.Router();

// Get all applications for the logged-in user
router.get('/', auth, async (req, res) => {
  try {
    const apps = await Application.findAll({
      where: { userId: req.user.id },
      include: [Job],
      order: [['date', 'DESC']]
    });
    res.json(apps);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new application
router.post('/', auth, async (req, res) => {
  try {
    const { jobId, status, date } = req.body;
    // Verify job belongs to user
    const job = await Job.findOne({ where: { id: jobId, userId: req.user.id } });
    if (!job) return res.status(404).json({ error: 'Job not found' });

    const app = await Application.create({
      jobId,
      status,
      date: date || new Date(),
      userId: req.user.id
    });
    res.status(201).json(app);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update an application
router.put('/:id', auth, async (req, res) => {
  try {
    const app = await Application.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (!app) return res.status(404).json({ error: 'Application not found' });

    await app.update(req.body);
    res.json(app);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete an application
router.delete('/:id', auth, async (req, res) => {
  try {
    const app = await Application.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (!app) return res.status(404).json({ error: 'Application not found' });

    await app.destroy();
    res.json({ message: 'Application deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
