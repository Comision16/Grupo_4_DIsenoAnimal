




module.exports = (req, res) =>  {
        const {id} = req.session.userLogin ? req.session.userLogin : 1

        const users = leerJSON('users');

        const usuario = users.find( user => user.id == id)
        
        
        res.render('products/todos', {
            productos,
            usuario
        })
    }