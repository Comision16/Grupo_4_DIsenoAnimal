const express = require('express');
const {login, register, processRegister, processLogin, logout, profile} = require('../controllers/usersController');
const userRegisterValidator = require('../../validations/user-register-validator');
const router = express.Router();

/* GET users listing. */
router
  .get('/ingreso', login)
  .post("/ingreso", processLogin)
  .get('/registro', register)
  .post('/registro',userRegisterValidator, processRegister)
  .get("/salir", logout)
  .get('/perfil', profile)
  
module.exports = router;


