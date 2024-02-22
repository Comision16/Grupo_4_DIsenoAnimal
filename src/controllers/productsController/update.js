
const fs = require('fs');
const db = require("../../database/models")

module.exports = (req, res) => {

  const { id } = req.params
  const { nombre, categoria, precio, stock, sabores, descuento, descripcion } = req.body;

  

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
        where : {
          id : producto.id
        }
      })

      db.stock.update({
        amount: +stock,
        flavorId: +sabores,
        productId: producto.id
      },{
        where : {
          productId : producto.id
        }
      })

      db.Image_products.update({
        file: req.files ? req.files.image1[0].filename : producto.Image_products[0].file,
        productId: producto.id
      },{
        where : {
          productId : producto.id
        }
      })

      db.Image_products.update({
        file: req.files ? req.files.image2[0].filenema : producto.Image_products[1].file,
        productId: producto.id
      },{
        where : {
          productId : producto.id
        }
      })

      return res.redirect('/admin/dashboard')
    })


   /*  const {nombre, precio, categoria, stock, sabores, descuento, descripcion} = req.body;
        
  const productUpdate = productos.map(product =>  {
        if (product.id == req.params.id) {
             
       product.nombre = nombre.trim(),
          product.image1 = req.files.image1 ? req.files.image1[0].filename :  product.image1,
          product.image2 = req.files.image2 ? req.files.image2[0].filename :  product.image2,
          product.precio = +precio,
           product.descuento = +descuento,
            product.descripcion = descripcion.trim(),
           product.categoria = categoria,
           product.sabores = sabores,
           product.stock = +stock
       }
        
        return product
     })

     fs.writeFileSync("./src/data/productos.json", JSON.stringify(productUpdate, null, 3), "utf-8");
     return res.redirect('/admin/dashboard')*/
    }  