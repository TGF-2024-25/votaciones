import { DataTypes } from 'sequelize';
import sequelize from '../DB/config.js';

const Candidacy = sequelize.define('Candidacy', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  user: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'users',
      key: 'email',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  electionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
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
    allowNull: true,
  },
  approved: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  tableName: 'candidacies',
  timestamps: true,
});

export default Candidacy;
