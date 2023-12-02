const express = require('express');
const {detail} = require('../controllers/productController');
const router = express.Router();

/* GET users listing. */
router
  .get('/detalle/:id?', detail )

module.exports = router;


