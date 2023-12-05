const { leerJSON } = require('../data')

module.exports = {
    
    dashboard: (req, res) => {

        const productos = leerJSON('productos');

        return res.render('./dashboard', {productos})
    }
}