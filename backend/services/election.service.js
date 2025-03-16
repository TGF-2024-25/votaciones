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
    return await electionRepository.create(newElection);
};

export const service_election_delete = async (id) => {
    const existingElection = await electionRepository.findById(id);
    if (!existingElection) {
        throw new Error('La Elección no existe.');
    }

    return await electionRepository.delete(id);
};
export const service_election_modify = async (id, imageUrl, participants, title, voteInitialDate, voteFinalDate) => {       //Update
    await validateString(title);
    await validateDate(voteInitialDate);
    await validateDate(voteFinalDate);

    const existingElection = await electionRepository.findById(id);
    if (!existingElection) {
        throw new Error('La Elección que quiere modificar no existe.');
    }

    const updatedElection = new Election(imageUrl, participants, title, voteInitialDate, voteFinalDate);
    return await electionRepository.update(id, updatedElection);
}

export const service_election_search = async (imageUrl, participants, title, voteInitialDate, voteFinalDate) => {
    const searchCriteria = { imageUrl, participants, title, voteInitialDate, voteFinalDate };
    return await electionRepository.search(searchCriteria);
}

export const service_election_consult = async (id) => {
    const election = await electionRepository.findById(id);
    if (!election) {
        throw new Error('La Elección no existe.');
    }
    return election;
};

export const service_election_vote = async (candidate, voterHashId) => {
    const election = await electionRepository.findByCandidate(candidate);
    if (!election) {
        throw new Error('La Elección asociada al candidato establecido no existe.');
    }
    const voto = { candidate, voterHashId };
    return await electionRepository.addVote(election.id, voto);
};

export const service_election_verifyVote = async (voterHashId) => {
    const vote = await electionRepository.findVoteByHashId(voterHashId);
    if (!vote) {
        throw new Error('Voto no existente.');
    }
    return vote;
};

export const service_election_addCandidate = async (candidacy) => {
    return candidacy;
};

export const service_election_deleteCandidate = async (id) => {
    return await electionRepository.deleteCandidate(id);
}; //Esta aqui pero no en Controller

export const service_election_countVotes = async () => {
    return await electionRepository.countVotes();
};