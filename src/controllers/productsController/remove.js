const { leerJSON, escribirJSON } = require("../../data");
const { existsSync, unlinkSync } = require('fs')

module.exports = (req, res) => {

    const {id} = req.params;

    const productos = leerJSON("productos")

    const {image} = productos.find(product => product.id == id);

    existsSync('public/images/' + image) && unlinkSync('public/images/' + image)

    const productoFiltrado = productos.filter(producto => producto.id != id )

    escribirJSON(productoFiltrado, "productos")


    return res.redirect('/admin/dashboard')
}