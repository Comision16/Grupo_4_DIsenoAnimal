const db = require("../../database/models")
module.exports =  (req, res) =>  {
        
    const { id } = req.session.userLogin
    const params = req.params;

    const product = db.Product.findByPk(params.id, {
        include: [
            "Image_products", "product_stock"
          ]
    })    

    const mascotas = db.Pet.findOne({
        where: {
            userId: id
        },
        include: ["user"]
    })

    const especies = db.Specie.findAll() 

    const sabores = db.Flavor.findAll()

    Promise.all([product, especies, mascotas,sabores])
    .then(([product, especies, mascotas,sabores]) => {
        return res.render('products/product-edit', {
            ...product.dataValues,
            especies,
            mascotas,
            sabores
        }) 
    })
        
        
    }