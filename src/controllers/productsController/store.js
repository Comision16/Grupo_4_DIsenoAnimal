
const fs = require('fs');
const db = require("../../database/models")

module.exports = (req, res) => {

    const { nombre, categoria, precio, stock, sabores, descuento, descripcion } = req.body;

    const image1 = req.files ? req.files.image1 : null
    const image2 = req.files ? req.files.image2 : null

    db.Product.create({
        name : nombre.trim(),
        price : precio,
        discount : +descuento,
        description : descripcion.trim(),
        specieId : +categoria        
    })
    .then(producto => {
        db.stock.create({
            amount : +stock,
            flavorId : +sabores,
            productId : producto.id
        })

        db.Image_products.create({
            file : image1[0].filename,
            productId : producto.id
        })

        db.Image_products.create({
            file : image2[0].filename,
            productId : producto.id
        })

        return res.redirect('/admin/dashboard')
    })
}