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
        return res.render('products/gatos')
    },
    perros : (req, res) => {
        return res.render('products/perros')
    },
    pequenios : (req, res) => {
        return res.render('products/pequenios')
    },
    Edit : (req, res) => {
            return res.render('products/product-edit')

    },
    Add : (req,res) => {
        return res.render('products/product-add')
        
    }
    
}