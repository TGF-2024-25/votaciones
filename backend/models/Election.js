import { DataTypes } from 'sequelize';
import sequelize from '../DB/config.js';
import User from './User.js';

const Election = sequelize.define('Election', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  init_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  end_date: {
    type: DataTypes.DATE,
    allowNull: false,
  }
}, {
  tableName: 'elections',
  timestamps: true,
});

// Relacion usuario-eleccion
const UserElection = sequelize.define('UserElections', {
  userId: {
    type: DataTypes.STRING,
    references: {
      model: User,
      key: 'email',
    },
  },
  electionId: {
    type: DataTypes.STRING,
    references: {
      model: Election,
      key: 'id',
    },
  },
}, {
  tableName: 'userElections',
  timestamps: true,
});


Election.belongsToMany(User, { through: UserElection, foreignKey: 'electionId' });
User.belongsToMany(Election, { through: UserElection, foreignKey: 'userId' });

export { Election as default, UserElection };