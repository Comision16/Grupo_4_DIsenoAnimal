const express = require('express');
const upload = require('../middlewares/upload');
const { getAllProducts, getOneProduct, createProduct, updateProduct, deleteProduct, } = require('../controllers/api/productsApiController');
const router = express.Router();

/* /apis */

router
  .get('/products',getAllProducts)                  //  todos los productos
  
  .get('/products/:id',getOneProduct)                 //  detalle del producto
  .post('/products', upload.fields([{ name: 'image1'}, { name: 'image2'}]), createProduct)  //crear producto nuevo
  .put('/products/:id', updateProduct)           // editar producto
  .delete("/products/:id",deleteProduct )         //eliminar producto

module.exports = router