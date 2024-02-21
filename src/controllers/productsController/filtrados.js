

module.exports = (req, res) =>  {
        
    
    const {id} = req.session.userLogin ? req.session.userLogin : 1

        const users = leerJSON('users');

        const usuario = users.find( user => user.id == id)
    
        const productos = leerJSON('productos');        
        
        const {categoria} = req.params;
        const producto = productos.filter(product => product.categoria == categoria);
       console.log(categoria);
       console.log(producto)
        return res.render('products/productFilter', {
            producto,
            usuario
         })
    }