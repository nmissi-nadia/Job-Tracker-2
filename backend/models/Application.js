const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Application = sequelize.define('Application', {
  status: DataTypes.STRING,
  date: DataTypes.DATE,
  jobId: DataTypes.INTEGER,
  userId: DataTypes.INTEGER

});

module.exports = Application;
