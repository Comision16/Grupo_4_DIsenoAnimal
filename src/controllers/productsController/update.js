
const fs = require('fs');
const db = require("../../database/models")

module.exports = (req, res) => {

  const { id } = req.params
  const { nombre, categoria, precio, stock, sabores, descuento, descripcion } = req.body;

  const image1 = req.files.image1 == undefined ? "null" : req.files.image1
  const image2 = req.files.image2 == undefined ? "null" : req.files.image2



  db.Product.findByPk(id, {
    include: ["Image_products"]
  })
    .then(producto => {
      db.Product.update({
        name: nombre.trim(),
        price: precio,
        discount: +descuento,
        description: descripcion.trim(),
        specieId: +categoria
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
        productId: producto.id
      }, {
        where: {
          productId: producto.id
        }
      })

      db.Image_products.update({
        file: req.files.image1 == undefined ? producto.Image_products[0].file : req.files.image1[0].filename,
        productId: producto.id
      }, {
        where: {
          productId: producto.id
        }
      })

      db.Image_products.update({
        file: req.files.image2 == undefined ? producto.Image_products[1].file : req.files.image2[0].filename,
        productId: producto.id
      }, {
        where: {
          productId: producto.id
        }
      })

      return res.redirect('/admin/dashboard')
    })
        })

      
}  