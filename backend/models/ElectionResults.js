import { DataTypes } from 'sequelize';
import sequelize from '../DB/config.js';
import User from './User.js';
import Election from './Election.js';

const ElectionResults = sequelize.define('ElectionResults', {
  electionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Election,
      key: 'id',
    },
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: User,
      key: 'email',
    },
  },
  votes: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
}, {
  tableName: 'election_results',
  timestamps: true,
});

Election.hasMany(ElectionResults, { foreignKey: 'electionId' });
ElectionResults.belongsTo(Election, { foreignKey: 'electionId' });

User.hasMany(ElectionResults, { foreignKey: 'userId' });
ElectionResults.belongsTo(User, { foreignKey: 'userId' });

export default ElectionResults;