
const db = require("../../database/models")
const { existsSync, unlinkSync } = require('fs');

module.exports = (req, res) => {

  const { id } = req.params
  const { nombre, categoria, precio, stock, sabores, descuento, descripcion, brand, measure, value } = req.body;

  db.Product.findByPk(id, {
    include: [
      "Image_products", "product_stock",
              "product_filing", "product_brand"
  ]
  })
    .then(producto => {

      db.Brand.update({
        name: brand
    }, {
        where: { id: producto.product_brand.id }
    
      }).then(() => {
        
        db.Filing.update({
            value: value,
            measure: measure
        }, {
            where: { id: producto.product_filing.id }
        
          }).then(() => {
      
            db.Product.update({
        name: nombre.trim(),
        price: precio,
        discount: +descuento,
        description: descripcion.trim(),
        specieId: +categoria,
        brandId: producto.product_brand.id,
        filingId: producto.product_filing.id, 
           
      },
        {
          where: {
            id: producto.id
          }
        })
        .then(() => {
          db.stock.update({
            amount: +stock,
            flavorId: +sabores,
          }, {
            where: {
              productId: producto.id
            }
          })

        })
        .then(() => {

          if (req.files.image1) {

            producto.Image_products[0] && existsSync('public/images/' + producto.Image_products[0].file) &&
              unlinkSync('public/images/' + producto.Image_products[0].file)

            db.Image_products.update({
              file: req.files.image1[0].filename
            }, {
              where: {
                productId: producto.id,
                primary: 1
              }
            })
          } else {
            return Promise.resolve()
          }
        })
        .then(() => {

          if (req.files.image2) {

            producto.Image_products[1] && existsSync('public/images/' + producto.Image_products[1].file) &&
              unlinkSync('public/images/' + producto.Image_products[1].file)

            db.Image_products.update({
              file: req.files.image2[0].filename
            }, {
              where: {
                productId: producto.id,
                primary: 2
              }
            })
          } else {
            return Promise.resolve()
          }
        })
        .then (() => {          
            return res.redirect('/admin/dashboard')
        })
    })
})
    })
  } 