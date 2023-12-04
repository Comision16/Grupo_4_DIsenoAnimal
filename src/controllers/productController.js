
module.exports = {
    detail : (req, res) => {
        return res.render('products/product-detail')
    },
    gatos : (req, res) => {
        return res.render('products/product-gatos')
    },
    perros : (req, res) => {
        return res.render('products/product-perros')
    },
    pequenios : (req, res) => {
        return res.render('products/product-pequenios')
    },
    Edit : (req, res) => {
            return res.render('products/product-edit')

    },
    Add : (req,res) => {
        return res.render('products/product-add')
        
    }
    
}