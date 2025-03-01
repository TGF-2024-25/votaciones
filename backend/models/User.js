export default class User {

    constructor(id = null, name, email, photo, password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.photo = photo;
        this.password = password;
    }
}
  