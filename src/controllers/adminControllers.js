const { leerJSON } = require('../data')

module.exports = {
    
    dashboard: (req, res) => {

        const productos = leerJSON('productos');
        console.log(productos);

        return res.render('./dashboard', {productos})
    }
}