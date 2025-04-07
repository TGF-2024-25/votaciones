import bcrypt from 'bcrypt';
import Election from '../models/Election.js';
import ElectionRepository from '../repositories/ElectionRepository.js';
import { validateString, validateDate } from '../utils/utils.js';

const electionRepository = new ElectionRepository();

export const service_election_create = async (imageUrl, participants, title, voteInitialDate, voteFinalDate) => {
    await validateString(title);
    await validateDate(voteInitialDate); 
    await validateDate(voteFinalDate);

    const newElection = new Election(imageUrl, participants, title, voteInitialDate, voteFinalDate);
    return await ElectionRepository.create(newElection);
};


export const service_election_delete = async (id) => {
    if (!id) {      //Comprobar que el ID no sea nulo
        throw new Error('El ID de la Elección es obligatorio.');
    }
    const existingElection = await ElectionRepository.findById(id);
    
    if (!existingElection) {
        throw new Error('La Elección no existe.');
    }

    return await electionRepository.delete(id);
};
export const service_election_modify = async (id, imageUrl, participants, title, voteInitialDate, voteFinalDate) => {       //Update
    await validateString(title);
    await validateDate(voteInitialDate);
    await validateDate(voteFinalDate);

    const existingElection = await ElectionRepository.findById(id);
    if (!existingElection) {
        throw new Error('La Elección que quiere modificar no existe.');
    }

    const updatedElection = new Election(imageUrl, participants, title, voteInitialDate, voteFinalDate);
    return await ElectionRepository.update(id, updatedElection);
}

export const service_election_search = async (imageUrl, participants, title, voteInitialDate, voteFinalDate) => {
    const searchCriteria = { imageUrl, participants, title, voteInitialDate, voteFinalDate };       //const params = {}; fijarse en Candidatures
    return await ElectionRepository.findByParams(searchCriteria);
}

export const service_election_consult = async (id) => {
    if (!id) {      //Comprobar que el ID no sea nulo
        throw new Error('El ID de la Elección es obligatorio.');
    }
    const election = await ElectionRepository.findById(id);
    if (!election) {
        throw new Error('La Elección no existe.');
    }
    return election;
};

export const service_election_vote = async (candidate, voterHashId) => {

    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Los meses van de 0-11
    const year = today.getFullYear();
    const currentDate = `${day}/${month}/${year}`;

    
      if (!voterHashId) {      //Comprobar que el ID no sea nulo
        throw new Error('El ID del voto es obligatorio.');
    }
    const election = await ElectionRepository.findBy(candidate);
    if (!election) {
        throw new Error('La Elección asociada al candidato establecido no existe.');
    }
    const voto = { candidate, voterHashId };
    //return await ElectionRepository.addVote(election.id, voto);
};

export const service_election_verifyVote = async (voterHashId) => {
    
    //IDvoto
    if (!voterHashId) {      //Comprobar que el ID no sea nulo
        throw new Error('El ID del voto es obligatorio.');
    }
    const vote = await ElectionRepository; //buscar el voto
    if (!vote) {
        throw new Error('Voto no existente.');
    }
    return vote;
};

export const service_election_addCandidate = async (candidacy) => {     //PUEDE QUE NO SE NECESITE AQUI
    return candidacy;
};

export const service_election_deleteCandidate = async (candidate, id) => {       //PUEDE QUE NO SE NECESITE AQUI
    //deleteCandidate(id);
    return await ElectionRepository.update(candidate, id);
}; //Esta aqui pero no en Controller

export const service_election_countVotes = async (id) => {
    //Comprobar fecha es inactiva
    if (!id) {      //Comprobar que el ID no sea nulo
        throw new Error('El ID de la Elección es obligatorio.');
    }
    //Bucle de candidatos
    
    return service_election_consult(id) ;
};