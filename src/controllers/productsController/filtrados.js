const {leerJSON} = require("../../data")

const db = require('../../database/models');



module.exports = (req, res) =>  {
        
    
    const {id} = req.session.userLogin ? req.session.userLogin : 1

        const users = leerJSON('users');

        const usuario = users.find( user => user.id == id)
    
              
        
        

        const {nameSpecie} = req.params

        db.Product.findAll({
            include: [
                "Image_products",
                "product_species",
            ]
        })
        .then(productos => {
            
            const productosFiltrados = productos.filter(producto => producto.product_species.name == nameSpecie);
    
            // return res.send(nameSpecie)
    
            // return res.send(productosFiltrados)
            return res.render('products/productFilter', {
                productos: productosFiltrados,
                usuario
            });
        })
        .catch(error => console.log(error));
    }