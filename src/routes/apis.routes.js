const express = require('express');
const upload = require('../middlewares/upload');
const { getAllProducts, getOneProduct, createProduct, updateProduct, deleteProduct} = require('../controllers/api/productsApiController');
const router = express.Router();

/* /apis */

router
  .get('/products',getAllProducts)
  .get('/products/:id',getOneProduct)
  .post('/products', upload.fields([{ name: 'image1'}, { name: 'image2'}]), createProduct)
  .put('/products/:id', updateProduct)
  .delete("/products/:id",deleteProduct )

module.exports = router