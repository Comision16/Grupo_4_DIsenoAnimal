const { check, body } = require("express-validator");
const { compareSync } = require('bcryptjs');
const { leerJSON } = require("../src/data");

const usuariosRegistrados = leerJSON('users');

module.exports = [
    check("email")
        .notEmpty().withMessage('El email es obligatorio').bail()
        .isEmail().withMessage('No es un email válido'),
    body("password")
        .notEmpty().withMessage("La contraseña es obligatoria").bail()
        .custom((value, { req }) => {
            const usuario = usuariosRegistrados.find(user => user.email === req.body.email.trim());

            if (usuario && compareSync(value.trim(), usuario.password)) {
                return true;
            }

            return Promise.reject('Credenciales inválidas');
        })
];