


module.exports = 
(req, res) => {
    const {id} = req.session.userLogin ? req.session.userLogin : 1

    const users = leerJSON('users');

    const usuario = users.find( user => user.id == id)
    

    const parametrizada = req.params.id
    const idproducto = productos.find(que => que.id == parametrizada )
        /*return res.send(productos)*/
        return res.render('products/product-detail', {
        productos,
        idproducto,
        usuario
        })

  }
