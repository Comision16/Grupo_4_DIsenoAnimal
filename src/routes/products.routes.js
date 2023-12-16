const express = require('express');
const {detail, gatos, perros, pequenios, Edit , Add} = require('../controllers/productController');
const { remove } = require('../controllers/productsController');
const router = express.Router();

/* GET productos listing. */
router
  .get('/detalle/:id?', detail )
  .get('/gatos', gatos )
  .get('/perros', perros )
  .get('/pequenios', pequenios )
  .get('/editar-articulo', Edit)
  .get('/agregar-articulos', Add)
  .delete("/eliminar/:id", remove)
module.exports = router;


