const express = require('express');
const {detail, gatos, perros, pequenios} = require('../controllers/productController');
const router = express.Router();

/* GET users listing. */
router
  .get('/detalle/:id?', detail )
  .get('/gatos', gatos )
  .get('/perros', perros )
  .get('/pequenios', pequenios )

module.exports = router;


