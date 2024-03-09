
const db = require('../../database/models');
const { existsSync, unlinkSync } = require('fs');

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
                    attributes : [ 'measure']

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


 const getOneProduct = async (req,res) => {
     try {
         const Producto = await db.Product.findByPk(req.params.id,{
            include : [
                {
                    association : 'Image_products',
                    attributes : ['file']
                },
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
                    attributes : [ 'measure']

                },
               
            ],
            attributes : ['id', 'name', "value", "description","price", ]
        })

         const productCustom = {
             ...Producto.dataValues,
             imagen : `${req.protocol}://${req.get('host')}/images/${Producto.Image_products.file}`,
             Marca : Producto.product_brand.name,
             tamaño : `${Producto.value} ${Producto.product_filing.measure} `
         }

         return res.status(200).json({
             ok : true,
            Producto : productCustom
         })
        
     } catch (error) {
         return res.status(error.status || 500).json({
             ok : false,
             msg : error.message || 'Upss, hubo un error. Sorry!'
         })
     }
}
  const   createProduct = async (req, res) => {
    
        try {
            const { nombre, categoria, precio, stock, sabores, descuento, descripcion, brand, measure, value } = req.body;
    
            const image1 = req.files && req.files.image1 ? req.files.image1 : null;
            const image2 = req.files && req.files.image2 ? req.files.image2 : null;
    
            const brandCreated = await db.Brand.create({
                name: brand
            });
    
            const producto = await db.Product.create({
                name : nombre.trim(),
                price : precio,
                discount : +descuento,
                description : descripcion.trim(),
                specieId : +categoria,
                value: value,
                brandId: brandCreated.id, 
                filingId: measure, 
            });
    
            await db.stock.create({
                amount : +stock,
                flavorId : +sabores,
                productId : producto.id
            });
    
            if (image1) {
                await db.Image_products.create({
                    file: image1[0].filename,
                    productId: producto.id,
                    primary: 1
                });
            }
    
            if (image2) {
                await db.Image_products.create({
                    file: image2[0].filename,
                    productId: producto.id,
                    primary: 2
                });
            }
    
            res.status(201).json({
                ok : true,
                msg : "Producto creado con éxito",
                product : producto
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                ok : false,
                msg : 'Hubo un error al crear el producto'
            });
        }
}
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, categoria, precio, stock, sabores, descuento, descripcion, brand, measure, value } = req.body;

        console.log(req.body)

        const image1 = req.files && req.files.image1 ? req.files.image1 : null;
        const image2 = req.files && req.files.image2 ? req.files.image2 : null;

        const productToUpdate = await db.Product.findByPk(id);

        if (!productToUpdate) {
            return res.status(404).json({
                ok: false,
                msg: 'Producto no encontrado'
            });
        }

        // Busca la marca por su nombre
        let brandToUpdate = await db.Brand.findOne({ where: { name: brand } });

        // Si la marca no existe, crea una nueva
        if (!brandToUpdate) {
            brandToUpdate = await db.Brand.create({ name: brand });
        }

        await productToUpdate.update({
            name: nombre.trim(),
            price: precio,
            discount: +descuento,
            description: descripcion.trim(),
            specieId: +categoria,
            value: value,
            brandId: brandToUpdate.id,
            filingId: measure,
        });

        const stockToUpdate = await db.stock.findOne({
            where: {
                productId: id
            }
        });

        if (stockToUpdate) {
            await stockToUpdate.update({
                amount: +stock,
                flavorId: +sabores,
            });
        }

        if (image1) {
            const imageToUpdate = await db.Image_products.findOne({
                where: {
                    productId: id,
                    primary: 1
                }
            });

            if (imageToUpdate) {
                // Elimina el archivo de imagen existente del sistema de archivos
                fs.unlinkSync(path.join(__dirname, '/ruta/a/tus/imagenes/', imageToUpdate.file));

                // Actualiza la entrada en la base de datos con la nueva imagen
                await imageToUpdate.update({
                    file: image1[0].filename,
                });
            }
        }

        if (image2) {
            const imageToUpdate = await db.Image_products.findOne({
                where: {
                    productId: id,
                    primary: 2
                }
            });

            if (imageToUpdate) {
                // Elimina el archivo de imagen existente del sistema de archivos
                fs.unlinkSync(path.join(__dirname, '/ruta/a/tus/imagenes/', imageToUpdate.file));

                // Actualiza la entrada en la base de datos con la nueva imagen
                await imageToUpdate.update({
                    file: image2[0].filename,
                });
            }
        }

        res.status(200).json({
            ok: true,
            msg: 'Producto actualizado con éxito',
            product: productToUpdate
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error al actualizar el producto'
        });
    }
}


const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const productToDelete = await db.Product.findByPk(id, {
            include: ["Image_products", "product_stock", "product_filing", "product_brand"]
        });

        if (!productToDelete) {
            return res.status(404).json({
                ok: false,
                msg: 'Producto no encontrado'
            });
        }

        if (productToDelete.Image_products[0] && existsSync('public/images/' + productToDelete.Image_products[0].file)) {
            unlinkSync('public/images/' + productToDelete.Image_products[0].file)

            await db.Image_products.destroy({
                where: {
                    productId: productToDelete.id,
                    primary: 1
                }
            });
        }

        if (productToDelete.Image_products[1] && existsSync('public/images/' + productToDelete.Image_products[1].file)) {
            unlinkSync('public/images/' + productToDelete.Image_products[1].file)

            await db.Image_products.destroy({
                where: {
                    productId: productToDelete.id,
                    primary: 2
                }
            });
        }

        await db.Image_products.destroy({
            where: {
                productId: productToDelete.id
            }
        });

        await db.stock.destroy({
            where: {
                productId: productToDelete.id
            }
        });

        await db.Product.destroy({
            where: {
                id
            }
        });

        res.status(200).json({
            ok: true,
            msg: 'Producto eliminado con éxito'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error al eliminar el producto'
        });
    }
}



module.exports = {
    getAllProducts,
    getOneProduct,
    createProduct,
    updateProduct,
    deleteProduct
    
}