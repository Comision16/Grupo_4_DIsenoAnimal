const express = require('express');
const {login, register, processRegister, processLogin, logout, profile} = require('../controllers/usersController');
const userRegisterValidator = require('../../validations/user-register-validator');
const userLogin = require('../../validations/users-login');
const router = express.Router();

/* GET users listing. */
router
  .get('/ingreso', login)
  .post("/ingreso",userLogin, processLogin)
  .get('/registro', register)
  .post('/registro',userRegisterValidator, processRegister)
  .get('/perfil', profile)
  .get("/salir", logout)
  
module.exports = router;


