const {leerJSON} = require("../data")
const productos = leerJSON('productos');

module.exports = {

    index : (req,res) => {
        /*return res.send(productos)*/
        return res.render('index', {
            productos , 
        })
        
        },
    cart : (req, res) => {
/*return res.send(productos)       */ 
return res.render('carrito',{
    productos 
})

    }
}