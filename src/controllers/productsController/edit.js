

module.exports =  (req, res) =>  {
        
    const {id} = req.params;
        const product = productos.find(product => product.id == id);
        
        return res.render('products/product-edit', {
            ...product
        }) 
    }