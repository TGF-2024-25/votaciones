import { DataTypes } from 'sequelize';
import sequelize from '../DB/config.js';
import Election from './Election.js';
import Candidacy from './Candidacy.js';

const Vote = sequelize.define('Vote', {
  electionID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Election,
      key: 'id',
    },
  },
  candidacyID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Candidacy,
      key: 'id',
    },
  },
  voterHashID: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  voteTime: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'votes',
  timestamps: true,
});

// Definir relaciones
Election.hasMany(Vote, { foreignKey: 'electionID' });
Vote.belongsTo(Election, { foreignKey: 'electionID' });

Candidacy.hasMany(Vote, { foreignKey: 'candidacyID' });
Vote.belongsTo(Candidacy, { foreignKey: 'candidacyID' });

export default Vote;