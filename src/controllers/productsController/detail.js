const db = require("../../database/models")

module.exports = 
(req, res) => {

    if (req.session.userLogin) {
        
    const params = req.params.id
    const {id} = req.session.userLogin 

    const productos = db.Product.findAll({ 
        include: [
            "Image_products" 
        ]
    })

    const idproducto = db.Product.findByPk(params,{
        include: [
            "Image_products" 
        ]
    })

    const usuario = db.User.findByPk(id)

    Promise.all([productos, usuario, idproducto])
    .then(([productos, usuario, idproducto]) => {
        /* return res.send(productos) */
        return res.render('products/product-detail', {
            productos,
            idproducto,             
            usuario        
        })
    })
    .catch(error => console.log(error));

    } else {
        const params = req.params.id

    const productos = db.Product.findAll({ 
        include: [
            "Image_products" 
        ]
    })

    const idproducto = db.Product.findByPk(params,{
        include: [
            "Image_products" 
        ]
    })

   /*  return res.send(idproducto) */

    const usuario = {}

    Promise.all([productos, usuario, idproducto])
    .then(([productos, usuario, idproducto,]) => {
        /* return res.send(productos) */
        return res.render('products/product-detail', {
            productos,
            idproducto,             
            usuario        
        })
    })
    .catch(error => console.log(error));
    }

    
}
