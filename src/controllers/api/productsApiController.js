const db = require('../../database/models');


const getAllProducts = async (req,res) => {
    try {
        const { count, rows } =  await db.Product.findAndCountAll({
            include : [
                {
                    association : 'product_species',
                    attributes : ['name']
                },
                {
                    association : 'product_brand',
                    attributes : ['name']
                },
                {
                    association : 'product_filing',
                    attributes : ['value', 'measure']

                }
            ],
            attributes : ['id', 'name']
        })

        const products = rows.map(product => {
            return {
                ...product.dataValues,
                detail : `${req.protocol}://${req.get('host')}/apis/products/${product.id}`
            }
        })

        return res.status(200).json({
            ok : true,
            count,
            products
        })
        
    } catch (error) {
        return res.status(error.status || 500).json({
            ok : false,
            msg : error.message || 'hubo un error. Sorry!'
        })
    }
}


// const getOneResto = async (req,res) => {
//     try {
//         const resto = await db.Restaurant.findByPk(req.params.id,{
//             include : [
//                 {
//                     association : 'category',
//                     attributes : ['name']
//                 },
//                 {
//                     association : 'address',
//                     attributes : ['street', 'city', 'province']
//                 },
//                 {
//                     association : 'images',
//                     attributes : ['file']
//                 }
//             ],
//             attributes :{
//                 exclude : ['categoryId', 'addressId', 'createdAt', 'updatedAt']
//             }
//         })

//         const restoCustom = {
//             ...resto.dataValues,
//             image : `${req.protocol}://${req.get('host')}/images/${resto.image}`,
//             category : resto.category.name,
//             address : `${resto.address.street} ${resto.address.city}, ${resto.address.province}`
//         }

//         return res.status(200).json({
//             ok : true,
//             resto : restoCustom
//         })
        
//     } catch (error) {
//         return res.status(error.status || 500).json({
//             ok : false,
//             msg : error.message || 'Upss, hubo un error. Sorry!'
//         })
//     }
// }


module.exports = {
    getAllProducts,
    // getOneResto
}