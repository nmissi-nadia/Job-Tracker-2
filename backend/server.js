const express = require('express');
const cors = require('cors');
const sequelize = require('./db');
const { Sequelize } = require('sequelize');
const authRoutes = require('./routes/auth');
const jobsRoutes = require('./routes/jobs');
const appRoutes = require('./routes/applications');
const statsRoutes = require('./routes/stats');
const { User, Job, Application } = require('./models');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobsRoutes);
app.use('/api/applications', appRoutes);
app.use('/api/stats', statsRoutes);

app.get('/', (req, res) => res.send('API Job Tracker OK'));

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Database connected');

    // Manual schema sync for existing tables
    console.log('Running manual schema update...');
    try {
      await sequelize.query('ALTER TABLE "Jobs" ADD COLUMN IF NOT EXISTS "userId" INTEGER REFERENCES "Users"(id) ON DELETE CASCADE;');
      await sequelize.query('ALTER TABLE "Applications" ADD COLUMN IF NOT EXISTS "userId" INTEGER REFERENCES "Users"(id) ON DELETE CASCADE;');
      console.log('Manual schema update successful');
    } catch (e) {
      console.log('Manual schema update note:', e.message);
    }

    await sequelize.sync({ alter: true });
    console.log('Database synchronized');

    app.listen(5000, () => console.log('Backend running on port 5000'));
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

startServer();
