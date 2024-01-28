const { leerJSON, escribirJSON } = require("../data");
const productos = leerJSON('productos');
const inscribiteJSON = leerJSON('inscribite');


module.exports = {
    
    index: (req, res) => {

        const {id} = req.session.userLogin ? req.session.userLogin : 1

        const users = leerJSON('users');

        const usuario = users.find( user => user.id == id)

        return res.render('index', {
            productos,
            usuario
        })

    },
    cart: (req, res) => {

        const {id} = req.session.userLogin ? req.session.userLogin : 1

        const users = leerJSON('users');

        const usuario = users.find( user => user.id == id)

        /*return res.send(productos)       */
        return res.render('carrito', {
            productos,
            usuario
        })

    },
    inscribite: (req, res) => {
        const molde = require('../data/moldeInscribite');
        const { email } = req.body;
        const nuevoMolde = new molde(email);
        inscribiteJSON.push(nuevoMolde);
        escribirJSON(inscribiteJSON, 'inscribite');

        return res.redirect('/')
    }
}