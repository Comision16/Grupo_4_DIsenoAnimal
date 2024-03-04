const { existsSync, unlinkSync } = require('fs')
const db = require("../../database/models")

module.exports = (req, res) => {

    const { id } = req.params;

    db.Product.findByPk(id, {
        include: ["Image_products", "product_stock"]
    })
        .then((producto) => {

            (producto.Image_products[0].length && existsSync('public/images/' + producto.Image_products[0].file)) && unlinkSync('public/images/' + producto.Image_products[0].file)

            (producto.Image_products[1].length && existsSync('public/images/' + producto.Image_products[1].file)) && unlinkSync('public/images/' + producto.Image_products[1].file)

            db.Image_products.destroy({
                where: {
                    productId: producto.id
                }
            })

            db.stock.destroy({
                where: {
                    productId: producto.id
                }
            })

            db.Product.destroy({
                where: {
                    id
                }
            })
                .then(() => {
                    return res.redirect('/admin/dashboard')
                })

        })


}