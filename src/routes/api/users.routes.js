const express = require('express');
const { listUser, oneUser, crearUsuario, editarUsuario, borrarUsuario } = require('../../controllers/api/usersController');
const upload = require('../../middlewares/upload');

const router = express.Router();

/* GET users listing. */
router
  .get('/users', listUser)
  .get('/users/:id', oneUser )
  .post('/users/create', crearUsuario )
  .put('/users/:id', upload.single('imagen'),  editarUsuario )
  .delete('/users/:id', borrarUsuario )
  
  
module.exports = router;


