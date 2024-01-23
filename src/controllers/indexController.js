const { leerJSON, escribirJSON } = require("../data")
const productos = leerJSON('productos');
const inscribiteJSON = leerJSON('inscribite');


module.exports = {


    index: (req, res) => {

        datosUsuario = req.session.userLogin ? req.session.userLogin : req.cookies.animalDeUs3r_Cancat;

        console.log(datosUsuario);

        return res.render('index', {
            productos,
            datosUsuario
        })

    },
    cart: (req, res) => {
        /*return res.send(productos)       */
        datosUsuario = req.session.userLogin ? req.session.userLogin : req.cookies.animalDeUs3r_Cancat;
        return res.render('carrito', {
            productos,
            datosUsuario
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