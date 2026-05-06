const express = require('express');
const cors = require('cors');
const sequelize = require('./db');
const authRoutes = require('./routes/auth');
const jobsRoutes = require('./routes/jobs');
const Job = require('./models/Job');
const User = require('./models/User');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobsRoutes);

sequelize.authenticate()
  .then(() => console.log('Database connected'))
  .catch(err => console.log('Database connection error:', err));

sequelize.sync()
  .then(() => console.log('Database synchronized'))
  .catch(err => console.log('Database sync error:', err));

app.get('/', (req, res) => res.send('API Job Tracker OK'));

app.listen(5000, () => console.log('Backend running on port 5000'));
