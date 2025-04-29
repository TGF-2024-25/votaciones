import { service_election_create, service_election_delete, service_election_modify, service_election_search, service_election_consult, service_election_vote, service_election_verifyVote, service_election_addCandidate, service_election_countVotes, service_election_deleteCandidate } from '../services/election.service.js'



export const controller_election_create = async (req, res) => {
    try {
        const { image, title, init_date, end_date, participantes } = req.body;

        const newElection = await service_election_create(image, title, init_date, end_date, participantes);
        
        res.status(201).json({ message: 'Elección creada con éxito', newElection });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const controller_election_delete = async (req, res) => {
    try {
        const { id } = req.body;
        const deletedElection = await service_election_delete(id);
        res.status(201).json({ message: 'Elección eliminada con éxito', deletedElection });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const controller_election_update = async (req, res) => {
    try {
        const { id, imageUrl, participants, title, voteInitialDate, voteFinalDate } = req.body;
        const modifiedElection = await service_election_modify(id, imageUrl, participants, title, voteInitialDate, voteFinalDate);
        res.status(201).json({ message: 'Elección modificada con éxito', modifiedElection });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

};

export const controller_election_search = async (req, res) => {
    try {
        const { id, title, email, voteInitialDate, voteFinalDate } = req.body;
        console.log(id);
        const elections = await service_election_search(id, title, email, voteInitialDate, voteFinalDate);
        console.log(elections);
        res.status(201).json({ message: 'Elecciones encontradas con éxito', elections });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const controller_election_consult = async (req, res) => {
    try {
      const { id } = req.body;  // Obtener el ID de la elección desde el cuerpo de la solicitud
      if (!id) throw new Error('ID de la elección es requerido');
  
      // Llamar al servicio para consultar la elección en base al ID
      const electionConsulted = await service_election_consult(id);
  
      // Si la elección no existe, devolver un error
      if (!electionConsulted) {
        return res.status(404).json({ message: 'Elección no encontrada' });
      }
      // Devolver la respuesta con los detalles de la elección
      res.status(200).json({
        message: 'Elección consultada con éxito',
        election: electionConsulted
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

export const controller_election_vote = async (req, res) => {
    try {
        const { candidate, voterHashId } = req.body;
        const vote = await service_election_vote(candidate, voterHashId);
        res.status(201).json({ message: 'Voto registrado con éxito', vote });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const controller_election_verifyVote = async (req, res) => {
    try {
        const { voterHashId } = req.body;
        const vote = await service_election_verifyVote(voterHashId);
        res.status(201).json({ message: 'Voto verificado con éxito', vote });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const controller_election_addCandidate = async (req, res) => {
    try {
        const { candidacy } = req.body;
        const candidate = await service_election_addCandidate(candidacy);
        res.status(201).json({ message: 'Candidato añadido con éxito', candidate });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

};

export const controller_election_deleteCandidate = async (req, res) => {
    try {
        const { id } = req.body; // Obtener el ID del candidato a eliminar desde el cuerpo de la solicitud
        const deletedCandidate = await service_candidate_delete(id); // Llamar al servicio para eliminar el candidato
        res.status(200).json({ message: 'Candidato eliminado con éxito', deletedCandidate });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const controller_election_countVotes = async (req, res) => {

    try {
        const votes = await service_election_countVotes();
        res.status(201).json({ message: 'Votos contados con éxito', votes });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};