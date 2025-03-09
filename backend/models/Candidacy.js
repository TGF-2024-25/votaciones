export default class Candidacy {

    constructor(id = null, user, electionId, slogan, text, video, approved) {
        this.id = id;
        this.user = user;
        this.electionId = electionId;
        this.slogan = slogan;
        this.text = text;
        this.video = video;
        this.approved = approved;
    }
}
  