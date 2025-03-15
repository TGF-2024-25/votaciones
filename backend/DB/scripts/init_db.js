import sequelize from '../config.js';
import User from '../../models/User.js';
import Vote from '../../models/Vote.js';
import { DATE } from 'sequelize';

async function insertData() {
  try {
    // Primero, inserta un usuario
    const newUser = await User.create({
      name: 'Hannah Montana',
      email: 'hmontana@gmail.com',
    });

    console.log('Usuario creado:', newUser);

    // Luego, inserta un post relacionado con ese usuario
    const newVote = await Vote.create({
      name: 'Votacion de clase',
      id: '1234567890',
      fecha_inicio: new Date(),
    });

    console.log('Vote creado:', newVote);


  } catch (error) {
    console.error('Error al insertar los datos:', error);
  }
}

// Ejecuta la función de inserción
insertData();