import { DataTypes } from 'sequelize';
import sequelize from '../DB/config.js';

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  surname: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM('admin', 'creator', 'user'),
    allowNull: false,
    defaultValue: 'user',
  }
}, {
  tableName: 'users',
  timestamps: true,
});

export default User;