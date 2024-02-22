const {leerJSON} = require("../../data")

const db = require('../../database/models');



module.exports = (req, res) =>  {

    /* return res.send(req.params) */
        
    
    const {id} = req.session.userLogin ? req.session.userLogin : 0

        const users = leerJSON('users');

        const usuario = users.find( user => user.id == id)        
        

        const {categoria} = req.params

        db.Product.findAll({
            include: [
                "Image_products",
                "product_species",
            ]
        })
        .then(productos => {
            
            const productosFiltrados = productos.filter(producto => producto.product_species.name == categoria);
    
            // return res.send(nameSpecie)
    
            // return res.send(productosFiltrados)
            return res.render('products/productFilter', {
                productos: productosFiltrados,
                usuario
            });
        })
        .catch(error => console.log(error));
    }