import sequelize from './config.js';
import User from '../models/User.js';
import Vote from '../models/Vote.js';

async function testAssociations() {
  // Sincronizar los modelos con la base de datos
  await sequelize.sync({ force: true });

  // Crear instancias de User y Vote
  const user1 = await User.create({ name: 'Alice', email: 'alice@example.com' });
  const user2 = await User.create({ name: 'Bob', email: 'bob@example.com' });

  const vote1 = await Vote.create({ name: 'Election 2025', id: 'vote1', fecha_inicio: new Date() });
  const vote2 = await Vote.create({ name: 'Referendum 2025', id: 'vote2', fecha_inicio: new Date() });

  // Asociar usuarios a votaciones
  await vote1.addUsers([user1, user2]);
  await vote2.addUser(user1);

  // Consultar las asociaciones
  const usersForVote1 = await vote1.getUsers();
  const votesForUser1 = await user1.getVotes();

  console.log('Users for Vote 1:', usersForVote1.map(user => user.email));
  console.log('Votes for User 1:', votesForUser1.map(vote => vote.name));
}

testAssociations().catch(console.error);