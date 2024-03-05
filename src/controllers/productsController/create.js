const db = require('../../database/models')

    module.exports = (req, res) =>  {
        const flavors = db.Flavor.findAll({
            order : ['name']
        });
        const species = db.Specie.findAll({
            order : ['id']
        });

        Promise.all([flavors, species])
            .then(([flavors, species]) => {
                return res.render('products/product-create',{
                    flavors,
                    species
                })
            })
            .catch(error => console.log(error))
        }