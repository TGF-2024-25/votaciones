export default class User {

    constructor(id, name, email, photo, password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.photo = photo;
        this.password = password;
    }
    
    constructor(name, email, photo, password) {
        this.name = name;
        this.email = email;
        this.photo = photo;
        this.password = password;
    }
}
  