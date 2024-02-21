
const fs = require('fs');

function pushProducts (parametro){
fs.writeFileSync("./src/data/productos.json", JSON.stringify(parametro, null, 3), "utf-8");}

module.exports = (req, res) =>  {
        
    const creador = require('../data/creador');
        const image1 = req.files.image1;
        const image2 = req.files.image2;
    
        const {nombre, categoria, precio, stock, sabores, descuento, descripcion} = req.body;
        const nuevoCreador = new creador(nombre, image1, image2, categoria, precio, stock, sabores, descuento, descripcion);
        productos.push(nuevoCreador);
        pushProducts(productos);
        return res.redirect('/admin/dashboard')
    } 