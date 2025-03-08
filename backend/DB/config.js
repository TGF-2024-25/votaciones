import { Sequelize } from 'sequelize';

// Configura la conexión
const sequelize = new Sequelize('eVoting', 'Nombre1', 'password1', {
  host: 'localhost',
  dialect: 'mariadb',
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

export default sequelize;