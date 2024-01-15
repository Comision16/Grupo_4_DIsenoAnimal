const bcryptjs = require('bcryptjs')
const crypto = require('crypto');

function User(nombre, email, password,password2) {
    this.id =  crypto.randomUUID();
    this.name = nombre.trim();
    this.email = email.trim();
    this.password = bcryptjs.hashSync(password.trim(), 10);
    this.password2 = password2.trim()
    this.role = "user";
    this.mascota = "";
    this.especie = "";
    this.img = "";
}

module.exports = User