
const db = require("../../database/models")

module.exports = (req, res) => {

    const { nombre, categoria, precio, stock, sabores, descuento, descripcion, brand, measure, value } = req.body;

    const image1 = req.files.image1 == undefined ? "null" : req.files.image1
    const image2 = req.files.image2 == undefined ? "null" : req.files.image2

    db.Brand.create({
        name: brand
    
    }).then(brand => {
        
        db.Filing.create({
            value: value,
            measure: measure
        }).then(filing => {
            
            db.Product.create({
                name : nombre.trim(),
                price : precio,
                discount : +descuento,
                description : descripcion.trim(),
                specieId : +categoria,
                brandId: brand.id, 
                filingId: filing.id, 
            })
    .then(producto => {
        db.stock.create({
            amount : +stock,
            flavorId : +sabores,
            productId : producto.id
        })

        if (image1) {
            db.Image_products.create({
                file: image1[0].filename,
                productId: producto.id,
                primary: 1
            })
        } else {
            db.Image_products.create({
                file: null,
                productId: producto.id,
                primary: 1
            })
        }

        if (image2) {
            db.Image_products.create({
                file: image2[0].filename,
                productId: producto.id,
                primary: 2
            })
        } else {
            db.Image_products.create({
                file: null,
                productId: producto.id,
                primary: 2
            })
        }

        

        

        return res.redirect('/')
    })
})
})
}