const express = require('express');
const { listUser, oneUser, crearUsuario } = require('../../controllers/api/usersController');

const router = express.Router();

/* GET users listing. */
router
  .get('/users', listUser)
  .get('/users/:id', oneUser )
  .post('/users/create', crearUsuario )
  
  
module.exports = router;


