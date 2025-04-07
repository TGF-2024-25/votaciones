import { DataTypes } from 'sequelize';
import sequelize from '../DB/config.js';
import Election from './Election.js';
import User from './User.js';

const Candidacy = sequelize.define('Candidacy', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  },
  user: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: User,
      key: 'email', // Asumiendo que el correo electrónico es la clave primaria en el modelo User
    },
  },
  electionID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Election,
      key: 'id',
    },
  },
  slogan: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  video: {
    type: DataTypes.STRING,
    allowNull: true, // URL o ruta del video
  },
  approved: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false, // Por defecto, no está aprobado
  },
}, {
  tableName: 'candidacies',
  timestamps: true,
});

// Definir relaciones
Election.hasMany(Candidacy, { foreignKey: 'electionID' });
Candidacy.belongsTo(Election, { foreignKey: 'electionID' });

User.hasMany(Candidacy, { foreignKey: 'user', sourceKey: 'email' });
Candidacy.belongsTo(User, { foreignKey: 'user', targetKey: 'email' });

export default Candidacy;