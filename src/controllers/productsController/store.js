
const db = require("../../database/models")

module.exports = (req, res) => {

    const { nombre, categoria, precio, stock, sabores, descuento, descripcion } = req.body;

    const image1 = req.files.image1 == undefined ? "null" : req.files.image1
    const image2 = req.files.image2 == undefined ? "null" : req.files.image2

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

        if (image1) {
            db.Image_products.create({
            file : image1[0].filename,
            productId : producto.id,
            primary : 1
        })
        } else if (image2) {
            db.Image_products.create({
            file : image2[0].filename,
            productId : producto.id,
            primary : 2
        })
        }

        

        

        return res.redirect('/admin/dashboard')
    })
}