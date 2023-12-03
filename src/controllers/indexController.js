const {leerJSON} = require("../data")


module.exports = {

    index : (req,res) => {
        const productos = leerJSON('productos');
        /*return res.send(productos)*/
        return res.render('index', {
            productos
        })
        
        },
    cart : (req, res) => {
        return res.render('carrito')
    }
}