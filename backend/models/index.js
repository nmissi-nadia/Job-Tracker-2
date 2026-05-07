const User = require('./User');
const Job = require('./Job');
const Application = require('./Application');

// User -> Job (One-to-Many)
User.hasMany(Job, { foreignKey: 'userId', onDelete: 'CASCADE' });
Job.belongsTo(User, { foreignKey: 'userId' });

// Job -> Application (One-to-Many)
Job.hasMany(Application, { foreignKey: 'jobId', onDelete: 'CASCADE' });
Application.belongsTo(Job, { foreignKey: 'jobId' });

// User -> Application (One-to-Many)
User.hasMany(Application, { foreignKey: 'userId', onDelete: 'CASCADE' });
Application.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
  User,
  Job,
  Application,
  sequelize: require('../db')
};

