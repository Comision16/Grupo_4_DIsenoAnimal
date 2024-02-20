



module.exports = (req, res) =>  {
        
    const {id} = req.session.userLogin ? req.session.userLogin : 1

        const users = leerJSON('users');

        const usuario = users.find( user => user.id == id)

        const productos = leerJSON('productos')

		const {keywords} = req.query;
        
		return res.render('products/product-search', {
			productos : productos.filter(producto => producto.nombre.toLowerCase().includes(keywords.toLowerCase()) ||  producto.descripcion.toLowerCase().includes(keywords.toLowerCase()) || producto.categoria.toLowerCase().includes(keywords.toLowerCase())), 
			keywords,
            usuario            
		})
    } 