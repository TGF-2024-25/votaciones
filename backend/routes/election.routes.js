import express from "express";
import {
  controller_election_create,
  controller_election_delete,
  controller_election_update,
  controller_election_search,
  controller_election_consult,
  controller_election_vote,
  controller_election_verifyVote,
  controller_election_addCandidate,
  controller_election_countVotes,
  controller_election_participants,
  controller_participant_delete,
} from "../controllers/election.controller.js";


const router = express.Router();


//CRUD
router.post("/createElection", controller_election_create);
//router.post('/create', controller_election_create);


router.post("/search", controller_election_search);
router.post("/modifyElection", controller_election_update);
//router.put("/modifyElection", controller_election_update);
router.post("/delete", controller_election_delete);


router.get("/consultElection/:id", controller_election_consult);
router.get("/consultElection/:id/participants", controller_election_participants);


router.post("/searchElection/:id", controller_election_search);


router.post("/modifyElection/:id", controller_election_update);
router.post("/deleteElection/:id", controller_election_delete);


router.post("/:id/vote/", controller_election_vote);
router.post("/verifyVote/", controller_election_verifyVote);
router.get("/countVotes/:id", controller_election_countVotes);


router.post("/addCandidate/:id", controller_election_addCandidate); // Añadir un candidato a la Election

router.delete("/:id/participants/", controller_participant_delete);


export default router;
