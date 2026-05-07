const express = require('express');
const Application = require('../models/Application');
const router = express.Router();

router.get('/', async (req, res) => {
  const apps = await Application.findAll();
  res.json(apps);
});

router.post('/', async (req, res) => {
  const app = await Application.create(req.body);
  res.json(app);
});

module.exports = router;
