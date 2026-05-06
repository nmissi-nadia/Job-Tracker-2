const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
// connex avec bd
const sequelize = new Sequelize('jobtracker','admin','admin',{
    host: 'db',
    dialect: 'postgres'
});
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);
sequelize.authenticate()
    .then(() => console.log('Database connected'))
    .catch(err => console.log('Error: ' + err));
app.get('/', (req, res) => res.send('API Job Tracker OK'));

app.listen(5000, () => console.log('Backend running on port 5000'));
