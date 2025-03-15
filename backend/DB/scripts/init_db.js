import sequelize from '../config.js';
import User from '../../models/User.js';
import Election from '../../models/Election.js';
import { DATE } from 'sequelize';

async function insertData() {
  try {

    // Sincroniza las tablas. Si ya existen, las elimina y las vuelve a crear
    await sequelize.sync({ force: true });
    console.log("Las tablas han sido sincronizadas.");

    const newUser = await User.create({
      name: 'Hannah',
      surname: 'Montana',
      password: '123',
      email: 'hmontana@gmail.com',
    });

    console.log('User created:', newUser);

    const newElection = await Election.create({
      title: 'Votacion de clase',
      id: '1234567890',
      init_date: new Date(),
      end_date: new Date('2025-04-10'),
    });

    console.log('Election created:', newElection);

    await newUser.addElection(newElection);
    console.log('User added to election');

  } catch (error) {
    console.error('Error al insertar los datos:', error);
  }
}

// Ejecuta la función de inserción
insertData();