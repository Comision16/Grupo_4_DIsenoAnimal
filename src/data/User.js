const bcryptjs = require('bcryptjs')
const crypto = require('crypto');

function User(nombre, email, password) {
    this.id =  crypto.randomUUID();
    this.name = nombre.trim();
    this.email = email.trim();
    this.password = bcryptjs.hashSync(password.trim(), 10);
    this.role = "user";

}

module.exports = User