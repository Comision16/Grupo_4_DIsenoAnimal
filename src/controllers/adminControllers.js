const { Op } = require('sequelize');
const { leerJSON } = require('../data')
const db = require("../database/models")

module.exports = {

    dashboard: (req, res) => {

        db.Product.findAll()
            .then(productos => {
                return res.render('./dashboard', { productos })
            })
            .catch(error => console.log(error))

    },
    search: (req, res) => {
        const { keywords } = req.query;

        db.Product.findAll({
            where: {
                name: {
                    [Op.substring]: keywords
                }
            }
        })
            .then(productos => {
                return res.render('dashboardFilter', {
                    productos,
                    keywords
                })

            })
            .catch(error => console.log(error))

    }
}