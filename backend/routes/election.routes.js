import express from 'express';
import { 
    controller_election_create, 
    controller_election_getAll, 
    controller_election_getById, 
    controller_election_update, 
    controller_election_delete, 
    controller_election_start, 
    controller_election_close, 
    controller_election_getCandidacies, 
    controller_election_addCandidacy, 
    controller_election_removeCandidacy 
} from '../controllers/election.controller.js';

const router = express.Router();

export default router;