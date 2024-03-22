const db = require('../../database/models')

    module.exports = (req, res) =>  {
        const flavors = db.Flavor.findAll({
            order : ['name']
        });
        const species = db.Specie.findAll({
            order : ['id']
        });
        const filings = db.Filing.findAll({
            order : ['id']
        });


        Promise.all([flavors, species, filings])
            .then(([flavors, species, filings]) => {
                return res.render('products/product-create',{
                    flavors,
                    species,
                    filings
                })
            })
            .catch(error => console.log(error))
        }