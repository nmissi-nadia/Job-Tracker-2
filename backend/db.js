const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('jobtracker', 'admin', 'admin', {
  host: 'db',
  dialect: 'postgres',
});

module.exports = sequelize;
