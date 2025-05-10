import Election from "../models/Election.js";
import ElectionRepository from "../repositories/ElectionRepository.js";
import { validateString, validateDate } from "../utils/utils.js";
import { service_search_candidacy } from "./candidacy.service.js";

const electionRepository = new ElectionRepository();


export const service_election_create = async (
  imageUrl,
  title,
  voteInitialDate,
  voteFinalDate,
  participantes
) => {
  await validateString(title);
  await validateDate(voteInitialDate);
  await validateDate(voteFinalDate);


  if (title === undefined || title == null) {
    throw new Error(
      "El título de la elección es obligatorio y no puede ser null o undefined."
    );
  }
  if (voteInitialDate === undefined || voteInitialDate == null) {
    throw new Error(
      "La fecha inicial de la elección es obligatoria y no puede ser null o undefined."
    );
  }
  if (voteFinalDate === undefined || voteFinalDate == null) {
    throw new Error(
      "La fecha final de la elección es obligatoria y no puede ser null o undefined."
    );
  }


  // Asegúrate de que los valores son cadenas cuando sea necesario (como title e imageUrl)
  if (typeof title != "string") {
    throw new Error("El título de la elección debe ser una cadena válida.");
  }
  voteInitialDate = new Date(voteInitialDate);
  voteFinalDate = new Date(voteFinalDate);


  // Verifica si ya existe una elección con el mismo título
  const existingElections = await electionRepository.findByParams({
    title: title,
  });
  if (existingElections.length > 0) {
    throw new Error("Ya existe una elección con ese título.");
  }


  // Verifica que la fecha de inicio sea menor que la fecha de fin
  if (voteInitialDate >= voteFinalDate) {
    throw new Error(
      "La fecha de inicio no puede ser mayor o igual a la fecha de fin."
    );
  }


  if (!Array.isArray(participantes)) {
    throw new Error("Los participantes deben enviarse en un array.");
  }
  if (participantes.length === 0) {
    throw new Error("Debe haber al menos un participante.");
  }


  // Crea el objeto con los datos para la nueva elección
  const newElection = {
    image: imageUrl,
    title: title,
    init_date: voteInitialDate,
    end_date: voteFinalDate,
  };


  // Crea la nueva elección en la base de datos
  console.log("Intentando crear eleccion...");
  const electionCreated = await electionRepository.create(newElection);
  console.log("Eleccion creada, intentando añadir el censo...");
  if (
    !(await electionRepository.createParticipants(
      participantes,
      electionCreated.id
    ))
  ) {
    console.log("El censo no se ha podido crear! Eliminando eleccion...");
    await electionRepository.delete(electionCreated.id);
    throw new Error("Error al crear el censo");
  }
  return true;
};


export const service_election_delete = async (id) => {
  if (!id) {
    //Comprobar que el ID no sea nulo
    throw new Error("El ID de la Elección es obligatorio.");
  }
  const existingElection = await electionRepository.findById(id);


  if (!existingElection) {
    throw new Error("La Elección no existe.");
  }


  return await electionRepository.delete(id);
};
export const service_election_modify = async (
  id,
  image,
  participants,
  title,
  voteInitialDate,
  voteFinalDate
) => {
  await validateString(title);
  await validateDate(voteInitialDate);
  await validateDate(voteFinalDate);


  const existingElection = await electionRepository.findById(id);
  if (!existingElection) {
    throw new Error("La Elección que quiere modificar no existe.");
  }


  const updatedElection = {
    image,
    participants,
    title,
    voteInitialDate,
    voteFinalDate
  };
  const result = await electionRepository.update(id, updatedElection);

  // Update participants
  console.log("Participantes:");
  console.log(participants);
  if (participants && participants.length > 0) {
    const participantsUpdated = await electionRepository.createParticipants(participants, id)
    if (!participantsUpdated) {
      throw new Error("Error al actualizar los participantes.");
    }
  }
  return result;
};


export const service_election_search = async (
  id,
  title,
  email,
  voteInitialDate,
  voteFinalDate
) => {
  let params = {};
  if (id) {
    await validateString(id);
    params.id = id;
  }
  if (title) {
    await validateString(title);
    params.title = title;
  }
  let elections = await electionRepository.findByParams(params);
  if (email) {
    await validateString(email);
    let userElections = await electionRepository.searchUserElections(email);
    console.log("Elecciones:");
    console.log(elections);
    console.log("UserElections:");
    console.log(userElections);
    const userElectionIds = new Set(userElections.map((e) => e.electionId));
    elections = elections.filter((e) => userElectionIds.has(e.id));
  }
  return elections;
};


export const service_election_consult = async (id) => {
  if (!id) {
    //Comprobar que el ID no sea nulo
    throw new Error("El ID de la Elección es obligatorio.");
  }
  const election = await electionRepository.findById(id);
  if (!election) {
    throw new Error("La Elección no existe.");
  }
  return election;
};


export const service_election_participants = async (electionId) => {
  if (!electionId) {
    throw new Error("El ID de la Elección es obligatorio.");
  }
  return await electionRepository.getParticipantsByElectionId(electionId);
};


export const service_election_vote = async (id, candidateId, voterHashId) => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Los meses van de 0-11
  const year = today.getFullYear();
  const currentDate = `${day}/${month}/${year}`;

  //console.log("PRUEBA DEL DEIVID ", id, " ",candidateId," ", voterHashId)

  if (!voterHashId) {
    //Comprobar que el ID no sea nulo
    throw new Error("El ID del voto es obligatorio.");
  }
  const election = await electionRepository.findById(id);
  if (!election) {
    throw new Error("La Elección asociada al candidato establecido no existe.");
  }
  // const voto = { candidateId, voterHashId };
  return await electionRepository.addVote(election.id, candidateId, voterHashId);
};


export const service_election_verifyVote = async (voterHashId, electionId) => {
  console.log("Verificamos el voto, ", voterHashId, electionId);
  //IDvoto
  if (!voterHashId) {
    //Comprobar que el ID no sea nulo
    throw new Error("El ID del voto es obligatorio.");
  }
  if (!electionId) {
    //Comprobar que el ID no sea nulo
    throw new Error("El ID de la eleccion es obligatorio.");
  }
  const vote = await electionRepository.findVote(voterHashId, electionId);
  return vote;
};


export const service_election_addCandidate = async (candidacy) => {
  //PUEDE QUE NO SE NECESITE AQUI
  return candidacy;
};


export const service_election_deleteCandidate = async (candidate, id) => {
  //PUEDE QUE NO SE NECESITE AQUI
  //deleteCandidate(id);
  return await electionRepository.update(candidate, id);
}; //Esta aqui pero no en Controller


export const service_election_countVotes = async (id) => {
  console.log("Recuento de votos de la eleccion ", id);

  const election = await service_election_consult(id);
  if (!election) {
    throw new Error("Elección no encontrada");
  }

  const now = new Date();
  const endDate = new Date(election.end_date);
  if (endDate > now) {
    throw new Error("La elección aún no ha finalizado");
  }

  // Obtener todos los votos de la elección
  const votes = await electionRepository.findVotesByParams({ electionID: id });

  // Obtener todas las candidaturas de la elección
  const candidacies = await service_search_candidacy({ electionID: id });

  // Inicializar el conteo de votos por candidatura
  const resultsMap = {};
  for (const candidatura of candidacies) {
    resultsMap[candidatura.id] = {
      candidateId: candidatura.id,
      user: candidatura.user,
      votes: 0,
    };
  }

  // Contar votos
  for (const vote of votes) {
    console.log(vote);
    if (resultsMap[vote.candidacyID]) {
      resultsMap[vote.candidacyID].votes += 1;
    }
  }

  // Devolver los resultados como array
  const results = Object.values(resultsMap).sort((a, b) => b.votes - a.votes);

  return results;
};


export const service_participant_delete = async (id, email) => {
  if (!id) {
    //Comprobar que el ID no sea nulo
    throw new Error("El ID de la Elección es obligatorio.");
  }
  if (!email) {
    //Comprobar que el ID no sea nulo
    throw new Error("El email del participante es obligatorio.");
  }
  const election = await electionRepository.findById(id);
  if (!election) {
    throw new Error("La Elección no existe.");
  }
  const participant =
    await electionRepository.findParticipantByElectionIdAndEmail(id, email);
  // Comprobar si el participante existe
  if (!participant) {
    throw new Error("El participante no existe.");
  }
  return await electionRepository.deleteParticipant(id, email);
};
