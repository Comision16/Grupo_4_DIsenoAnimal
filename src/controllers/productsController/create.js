const db = require("../../database/models")

module.exports = (req, res) => {
    const especies = db.Specie.findAll()

    const mascotas = db.Pet.findOne()

    const sabores = db.Flavor.findAll()

    const filing = db.Filing.findAll()

    Promise.all([especies, mascotas, sabores, filing])
        .then(([especies, mascotas, sabores, filing]) => {
            return res.render('products/product-create', {
                especies,
                mascotas,
                sabores,
                filing
            })
        })

}