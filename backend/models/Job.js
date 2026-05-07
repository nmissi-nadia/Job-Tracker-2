const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Job = sequelize.define('Job', {
  title: DataTypes.STRING,
  company: DataTypes.STRING,
  link: DataTypes.STRING,
  skills: DataTypes.STRING,
  userId: DataTypes.INTEGER

});

module.exports = Job;
