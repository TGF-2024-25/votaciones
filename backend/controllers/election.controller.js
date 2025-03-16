import { controller_election_create, controller_election_update, controller_election_delete, controller_election_search, controller_election_consult, controller_election_vote, controller_election_verifyVote, controller_election_addCandidate, controller_election_deleteCandidate, controller_election_countVotes } from '../services/election.service.js'



export const controller_election_create = async (req, res) => {

    try {
            
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
};

export const controller_election_update = async (req, res) => {};

export const controller_election_delete = async (req, res) => {};

export const controller_election_search = async (req, res) => {};

export const controller_election_consult = async (req, res) => {
};

export const controller_election_vote = async (req, res) => {
};

export const controller_election_verifyVote = async (req, res) => {
};

export const controller_election_addCandidate = async (req, res) => {

};

export const controller_election_deleteCandidate = async (req, res) => {
};

export const controller_election_countVotes = async (req, res) => {
};