const express = require('express');
const {detail, edit , create, store, update, search, filtrados, remove, todos} = require('../controllers/productsController');

const router = express.Router();
const upload = require('../middlewares/upload');
const createProductValidation = require('../../validations/createProductValidation');
const checkUserLogin = require('../middlewares/checkUserLogin');


/* GET productos listing. */
router
  .get('/detalle/:id?', detail )
  .get('/filtrados/:categoria',filtrados)
  
  .get('/editar-articulo/:id', checkUserLogin, edit)
  .put('/update/:id', checkUserLogin,  upload.fields([
  {
    name : 'image1'
  },
  {
    name : 'image2'
  }
  ]),update)

  .get('/agregar-articulos', checkUserLogin, create)
  .get('/todos', todos)
  .get('/search', search)
  .post('/store', upload.fields([
  {
    name : 'image1'
  },
  {
    name : 'image2'
  }
  ]),createProductValidation, checkUserLogin,store)

  .delete("/eliminar/:id",checkUserLogin, remove)


module.exports = router;


              