import express from 'express';
import { 
    controller_election_create, 
    controller_election_delete, 
    controller_election_modify, 
    controller_election_search, 
    controller_election_consult, 
    controller_election_vote, 
    controller_election_verifyVote, 
    controller_election_addCandidate,
    controller_election_countVotes
} from '../controllers/election.controller.js';

const router = express.Router();

//CRUD
router.post('/createElection', controller_election_create);
router.post('/modifyElection/:id', controller_election_modify);
router.post('/deleteElection/:id', controller_election_delete);
router.get('/searchElection/:id', controller_election_search);
router.get('/consultElection/:id', controller_election_consult);

router.post('/vote/:id', controller_election_vote);
router.get('/verifyVote/:voterHashId', controller_election_verifyVote);
router.get('/countVotes/:id', controller_election_countVotes);

router.post('/addCandidate/:id', controller_election_addCandidate); // Añadir un candidato a la Election



export default router;