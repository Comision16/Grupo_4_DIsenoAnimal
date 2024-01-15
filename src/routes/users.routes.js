const express = require('express');
const {login, register, processRegister, processLogin, logout, profile} = require('../controllers/usersController');
const userRegisterValidator = require('../../validations/user-register-validator');
const userLogin = require('../../validations/userLogin');
const checkUserLogin = require('../middlewares/checkUserLogin');
const checkAuth = require('../middlewares/checkAuth');

const router = express.Router();

/* GET users listing. */
router
  .get('/ingreso', checkUserLogin, login)
  .post("/ingreso",userLogin, processLogin)
  .get('/registro', checkAuth, register)
  .post('/registro',userRegisterValidator, processRegister)
  .get('/perfil', checkUserLogin, profile)
  .get("/salir", checkUserLogin, logout)
  
module.exports = router;


