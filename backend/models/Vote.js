import { DataTypes } from 'sequelize';
import sequelize from '../DB/config.js';
import User from './User.js';

const Vote = sequelize.define('Vote', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    primaryKey: true,
  },
  fecha_inicio: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  tableName: 'votes',
  timestamps: true,
});

// Definir la relación muchos a muchos con una tabla intermedia
const UserVotes = sequelize.define('UserVotes', {
  userId: {
    type: DataTypes.STRING,
    references: {
      model: User,
      key: 'email',
    },
  },
  voteId: {
    type: DataTypes.STRING,
    references: {
      model: Vote,
      key: 'id',
    },
  },
});

Vote.belongsToMany(User, { through: UserVotes, foreignKey: 'voteId' });
User.belongsToMany(Vote, { through: UserVotes, foreignKey: 'userId' });

export default Vote;