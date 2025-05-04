import BaseRepository from "./BaseRepository.js";
import Election, { UserElection } from "../models/Election.js";
import User from "../models/User.js";


export default class ElectionRepository extends BaseRepository {
  constructor() {
    super();
  }


  async create(entity) {
    try {
      const newElection = await Election.create(entity);
      return newElection;
    } catch (error) {
      console.error("Error al crear la elección:", error);
      throw error;
    }
  }


  async createParticipants(participants, electionId) {
    try {
      for (const participant of participants) {
        const row = { userId: participant, electionId };
        await UserElection.create(row);
      }
      return true;
    } catch (error) {
      console.error("Error al crear los participantes:", error);
      return false;
    }
  }


  async getParticipantsByElectionId(electionId) {
    try {
      const election = await Election.findByPk(electionId, {
        include: [
          {
            model: User,
            through: { attributes: [] },
          },
        ],
      });
      if (!election) {
        throw new Error("Elección no encontrada");
      }
      console.log({election})
      return election.Users;
    } catch (error) {
      console.error(
        "Error al obtener los participantes de la elección:",
        error
      );
      throw error;
    }
  }


  async searchUserElections(email) {
    try {
      let params = { userId: email };
      const elections = await UserElection.findAll({ where: params });
      return elections;
    } catch (error) {
      console.error("Error al buscar elecciones con parámetros:", error);
      throw error;
    }
  }


  async delete(id) {
    try {
      const election = await Election.findByPk(id);
      if (election) {
        await election.destroy();
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error al eliminar la elección:", error);
      throw error;
    }
  }

  async deleteParticipant(id, email) {
    try {
      const participant = await UserElection.findByPk(id, {
        include: [
          {
            model: User,
            where: { email },
            through: { attributes: [] },
          },
        ],
      });

      if (!participant) {
        throw new Error("Elección no encontrada o usuario no participante");
      }
      console.log('\n\n\n', type(participant), { participant });
      //await participant.destroy();
    } catch (error) {
      console.error(
        "Error al eliminar el participante de la elección:",
        type(participant)
      );
      throw error;
    }
  }


  async findById(id) {
    try {
      const election = await Election.findByPk(id);
      return election;
    } catch (error) {
      console.error("Error al buscar la elección por ID:", error);
      throw error;
    }
  }


  async findAll() {
    try {
      const elections = await Election.findAll();
      return elections;
    } catch (error) {
      console.error("Error al buscar todas las elecciones:", error);
      throw error;
    }
  }


  async findByParams(params) {
    try {
      const elections = await Election.findAll({ where: params });
      return elections;
    } catch (error) {
      console.error("Error al buscar elecciones con parámetros:", error);
      throw error;
    }
  }

  async findParticipantByElectionIdAndEmail(electionId, email) {
    try {
      const election = await Election.findByPk(electionId, {
        include: [
          {
            model: User,
            where: { email },
            through: { attributes: [] },
          },
        ],
      });
      if (!election) {
        throw new Error("Elección no encontrada o usuario no participante");
      }
      return election.Users;
    } catch (error) {
      console.error(
        "Error al buscar el participante por ID de elección y correo electrónico:",
        error
      );
      throw error;
    }
  }


  async update(id, entity) {
    try {
      const election = await Election.findByPk(id);
      if (election) {
        election.title = entity.title || election.title;
        election.image = entity.image || election.image;
        election.init_date = entity.init_date || election.init_date;
        election.end_date = entity.end_date || election.end_date;


        await election.save(); // Guarda los cambios
        console.log("Elección actualizada");
        return election;
      }
      return null;
    } catch (error) {
      console.error("Error al actualizar la elección:", error);
      throw error;
    }
  }
}
