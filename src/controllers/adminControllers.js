const { leerJSON } = require('../data')

module.exports = {
    
    dashboard: (req, res) => {

        const productos = leerJSON('productos');

        return res.render('./dashboard', {productos})
    },
    search: (req, res) => {        
        const productos = leerJSON('productos');
		const {keywords} = req.query;
		return res.render('dashboardFilter', {
			productos : productos.filter(producto => producto.nombre.toLowerCase().includes(keywords.toLowerCase())), 
			keywords            
		})
	}
}