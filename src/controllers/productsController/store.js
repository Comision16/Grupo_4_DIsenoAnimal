const db = require("../../database/models");
const { validationResult } = require('express-validator');


module.exports = (req, res) => {

    const errors = validationResult(req).mapped();
    const error = validationResult(req);

    console.log(req.body);

    if (Object.keys(errors).length > 0) {
        const especies = db.Specie.findAll()

        const mascotas = db.Pet.findOne()

        const sabores = db.Flavor.findAll()

        const filing = db.Filing.findAll()

        Promise.all([especies, mascotas, sabores, filing])
            .then(([especies, mascotas, sabores, filing]) => {
                return res.render('products/product-create', {
                    especies,
                    mascotas,
                    sabores,
                    filing,
                    errors,
                    old: req.body
                })
            })


    }
    const { nombre, categoria, precio, stock, sabores, descuento, descripcion, brand, measure, value } = req.body;

    const image1 = req.files.image1 == undefined ? "null" : req.files.image1;
    const image2 = req.files.image2 == undefined ? "null" : req.files.image2;

    if (!error) {
        db.Brand.create({
        name: brand
    }).then(brand => {
        db.Product.create({
            name: nombre.trim(),
            price: +precio,
            discount: +descuento,
            description: descripcion.trim(),
            specieId: +categoria,
            value: value,
            brandId: brand.id,
            filingId: measure,
        })
            .then(producto => {
                db.stock.create({
                    amount: +stock,
                    flavorId: +sabores,
                    productId: producto.id
                });

                if (image1) {
                    db.Image_products.create({
                        file: image1[0].filename,
                        productId: producto.id,
                        primary: 1
                    });
                } else {
                    db.Image_products.create({
                        file: null,
                        productId: producto.id,
                        primary: 1
                    });
                }

                if (image2) {
                    db.Image_products.create({
                        file: image2[0].filename,
                        productId: producto.id,
                        primary: 2
                    });
                } else {
                    db.Image_products.create({
                        file: null,
                        productId: producto.id,
                        primary: 2
                    });
                }
                return res.redirect('/admin/dashboard');
            });
    });
    }

    
}
