const db = require("../../database/models")
module.exports = (req, res) => {

    const { id } = req.session.userLogin
    const params = req.params;

    const product = db.Product.findByPk(params.id, {
        include: [
            "Image_products", "product_stock",
            "product_filing", "product_brand"
            
        ]
    })

    const mascotas = db.Pet.findOne({
        where: {
            userId: id
        },
        include: ["user"]
    })
    const brand = db.Brand.findAll()

    const filing = db.Filing.findAll()

    const especies = db.Specie.findAll()

    const sabores = db.Flavor.findAll()

    Promise.all([product, especies, mascotas, sabores, brand, filing])
        .then(([product, especies, mascotas, sabores, brand, filing]) => {
            
            return res.render('products/product-edit', {
                ...product.dataValues,
                especies,
                mascotas,
                sabores,
                brand,
                filing
            })
        })
}