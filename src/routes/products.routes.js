const express = require('express');
const {detail, gatos, perros, pequenios, Edit , create, store, todos, search} = require('../controllers/productController');
const { remove } = require('../controllers/productsController');
const router = express.Router();
const upload = require('../middlewares/upload');

/* GET productos listing. */
router
  .get('/detalle/:id?', detail )
  .get('/gatos', gatos )
  .get('/perros', perros )
  .get('/pequenios', pequenios )
  .get('/editar-articulo', Edit)
  .get('/agregar-articulos', create)
  .get('/todos', todos)
  .get('/search', search)
  .post('/store', upload.single('images'), store)
  .delete("/eliminar/:id", remove)
module.exports = router;


