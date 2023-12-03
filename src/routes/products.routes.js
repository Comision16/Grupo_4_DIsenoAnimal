const express = require('express');
const {detail, gatos, perros, pequenios, Edit , Add} = require('../controllers/productController');
const router = express.Router();

/* GET users listing. */
router
  .get('/detalle/:id?', detail )
  .get('/gatos', gatos )
  .get('/perros', perros )
  .get('/pequenios', pequenios )
  .get('/editar-articulo', Edit)
  .get('/agregar-articulos', Add)
module.exports = router;


