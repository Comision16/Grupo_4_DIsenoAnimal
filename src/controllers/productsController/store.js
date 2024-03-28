const db = require("../../database/models");
const { validationResult } = require('express-validator');

module.exports = async (req, res) => {
    const errors = validationResult(req).mapped();

    if (Object.keys(errors).length > 0) {
        const especiesPromise = db.Specie.findAll();
        const mascotasPromise = db.Pet.findOne();
        const saboresPromise = db.Flavor.findAll();
        const filingPromise = db.Filing.findAll();

        Promise.all([especiesPromise, mascotasPromise, saboresPromise, filingPromise])
            .then(([especies, mascotas, sabores, filing]) => {
                return res.render('products/product-create', {
                    especies,
                    mascotas,
                    sabores,
                    filing,
                    errors,
                    old: req.body
                });
            })
            .catch(err => {
                console.error('Error fetching data from database:', err);
                return res.status(500).send('Internal Server Error');
            });
    } else {
        const { nombre, categoria, precio, stock, sabores, descuento, descripcion, brand, measure, value } = req.body;
        const image1 = req.files.image1 == undefined ? null : req.files.image1[0].filename;
        const image2 = req.files.image2 == undefined ? null : req.files.image2[0].filename;
        
        let producto; 
    
        await db.Brand.create({ name: brand })
            .then(brand => {
                return db.Product.create({
                    name: nombre.trim(),
                    price: +precio,
                    discount: +descuento,
                    description: descripcion.trim(),
                    specieId: +categoria,
                    value,
                    brandId: brand.id,
                    filingId: measure,
                });
            })
            .then(createdProduct => {
                producto = createdProduct; 
                return db.stock.create({
                    amount: +stock,
                    flavorId: +sabores,
                    productId: producto.id
                });
            })
            .then(() => {
                if (image1) {
                    return db.Image_products.create({
                        file: image1  ,
                        productId: producto.id,
                        primary: 1
                    });
                } else {
                    return db.Image_products.create({
                        file: null,
                        productId: producto.id,
                        primary: 1
                    });
                }
            })
            .then(() => {
                if (image2) {
                    return db.Image_products.create({
                        file: image2,
                        productId: producto.id,
                        primary: 2
                    });
                } else {
                    return db.Image_products.create({
                        file: null,
                        productId: producto.id,
                        primary: 2
                    });
                }
            })
            .then(() => {
                return res.redirect('/admin/dashboard');
            })
            .catch(error => {
                console.error(console.log(error));
            });
    }
    
};