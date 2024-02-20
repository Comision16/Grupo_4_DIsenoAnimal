const { leerJSON, escribirJSON } = require("../data");
const db = require('../database/models');
const image_product = require("../database/models/image_product");
const inscribiteJSON = leerJSON('inscribite');


module.exports = {
    
    index: (req, res) => {

        const {id} = req.session.userLogin ? req.session.userLogin : 1

        const users = leerJSON('users');

        const usuario = users.find( user => user.id == id)
        
        db.Product.findAll({
            include: [
                "Image_products"
              ]
        })
            .then( products =>{
                //    return res.send(products)
                   return res.render('index', {
            products,
            usuario  
        })
     })
     .catch(error => console.log(error))
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