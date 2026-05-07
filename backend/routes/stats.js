const express = require('express');
const { Job, Application, sequelize } = require('../models');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const userId = req.user.id;

    // Total counts
    const totalJobs = await Job.count({ where: { userId } });
    const totalApplications = await Application.count({ where: { userId } });

    // Count by status
    const statusCounts = await Application.findAll({
      where: { userId },
      attributes: [
        'status',
        [sequelize.fn('COUNT', sequelize.col('status')), 'count']
      ],
      group: ['status']
    });

    // Format stats for frontend
    const stats = {
      totalJobs,
      totalApplications,
      byStatus: statusCounts.reduce((acc, curr) => {
        acc[curr.status] = parseInt(curr.getDataValue('count'));
        return acc;
      }, {})
    };

    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
