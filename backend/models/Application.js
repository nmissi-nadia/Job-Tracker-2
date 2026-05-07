const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Application = sequelize.define('Application', {
  status: DataTypes.STRING,
  date: DataTypes.DATE
});

module.exports = Application;
