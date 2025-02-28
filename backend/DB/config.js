const { Sequelize } = require('sequelize');

// Configura la conexión
const sequelize = new Sequelize('nombre_de_base_de_datos', 'usuario', 'contraseña', {
  host: 'localhost',
  dialect: 'mysql',
});
