import sequelize from '../config.js';
import User from '../../models/User.js';
import Election from '../../models/Election.js';
import Candidacy from '../../models/Candidacy.js';
import Vote from '../../models/Vote.js';
import ElectionResults from '../../models/ElectionResults.js';
import bcrypt from 'bcrypt';

async function insertData() {
  try {
    // Sincroniza las tablas. Si ya existen, las elimina y las vuelve a crear
    await sequelize.sync({ force: true });
    console.log('Las tablas han sido sincronizadas.');

    // Crear un usuario
    const hashedPassword = await bcrypt.hash('123', 10);
    const newUser = await User.create({
      name: 'Hannah',
      surname: 'Montana',
      id: '000000001',
      password: hashedPassword,
      email: 'hmontana@gmail.com',
    });
    console.log('User created:', newUser);

    // Crear una elección
    const newElection = await Election.create({
      title: 'Votación de clase',
      id: '100000000',
      init_date: new Date(),
      end_date: new Date('2025-04-10'),
    });
    console.log('Election created:', newElection);

    // Relacionar usuario con la elección
    await newUser.addElection(newElection);
    console.log('User added to election');

    // Crear una candidatura
    const newCandidacy = await Candidacy.create({
      user: newUser.email,
      electionID: newElection.id,
      slogan: 'Un futuro mejor',
      text: 'Mi propuesta es mejorar la educación y la salud.',
      video: 'https://example.com/video.mp4',
      approved: true,
    });
    console.log('Candidacy created:', newCandidacy);

    // Crear un voto
    const newVote = await Vote.create({
      electionID: newElection.id,
      candidacyID: newCandidacy.id,
      voterHashID: 'hashed-voter-id-123',
      voteTime: new Date(),
    });
    console.log('Vote created:', newVote);

    // Crear un resultado de elección
    const newElectionResult = await ElectionResults.create({
      electionId: newElection.id,
      userId: newUser.email,
      votes: 100,
    });
    console.log('Election result created:', newElectionResult);

  } catch (error) {
    console.error('Error al insertar los datos:', error);
  }
}

// Ejecuta la función de inserción
insertData();