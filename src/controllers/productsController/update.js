
const fs = require('fs');



module.exports = (req, res) =>  {
        
    const {categoria, nombre, descuento, descripcion, precio, sabores, stock} = req.body;
        
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
     return res.redirect('/admin/dashboard')
    } 