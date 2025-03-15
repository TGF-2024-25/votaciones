import { DataTypes } from 'sequelize';
import sequelize from '../DB/config.js';

const User = sequelize.define('User', {
  // Definir los atributos de la tabla
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    primaryKey: true,
  },
}, {
  tableName: 'users',
  timestamps: true,
});

export default User;