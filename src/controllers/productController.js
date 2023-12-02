module.exports = {
    detail : (req, res) => {
        return res.render('products/product-detail')
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
    
}