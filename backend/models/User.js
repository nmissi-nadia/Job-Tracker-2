const {DataTypes} = require('sequelize');
const sequelize = require('../server');

const User = sequelize.define('User', {
    email: {type: DataTypes.STRING, unique:true},
    password: DataTypes.STRING
});

module.exports = User;