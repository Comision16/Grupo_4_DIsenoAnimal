const {leerJSON} = require("../data")

module.exports = {
    detail : (req, res) => {
        const productos = leerJSON('productos');
        const parametrizada = +req.params.id
        const idproducto = productos.find(que => que.id === parametrizada )
            /*return res.send(productos)*/
            return res.render('products/product-detail', {
                productos,idproducto
            })
    },
    gatos : (req, res) => {
        const productos = leerJSON('productos');
        return res.render('products/gatos',{
            productos
        })
    },
    perros : (req, res) => {
        const productos = leerJSON('productos');
        return res.render('products/perros',{
            productos
        })
    },
    pequenios : (req, res) => {
        const productos = leerJSON('productos');
        return res.render('products/pequenios',{
            productos
        })
    },
    Edit : (req, res) => {
            return res.render('products/product-edit')

    },
    Add : (req,res) => {
        return res.render('products/product-add')
        
    }
    
}