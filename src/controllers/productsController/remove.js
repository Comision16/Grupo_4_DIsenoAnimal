const { leerJSON, escribirJSON } = require("../../data");
const { existsSync, unlinkSync } = require('fs')

module.exports = (req, res) => {
    datosUsuario = req.session.userLogin ? req.session.userLogin : req.cookies.animalDeUs3r_Cancat;

    const {id} = req.params;

    const productos = leerJSON("productos")

    const {image1, image2} = productos.find(product => product.id == id);

    existsSync('public/images/' + image1) && unlinkSync('public/images/' + image1)

    existsSync('public/images/' + image2) && unlinkSync('public/images/' + image2)

    const productoFiltrado = productos.filter(producto => producto.id != id )

    escribirJSON(productoFiltrado, "productos")


    return res.redirect('/admin/dashboard', {
        datosUsuario
    })
}