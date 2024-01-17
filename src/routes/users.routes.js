const express = require('express');
const {login, register, processRegister, processLogin, logout, profile, update} = require('../controllers/usersController');
const userRegisterValidator = require('../../validations/user-register-validator');
const userLogin = require('../../validations/userLogin');
const checkUserLogin = require('../middlewares/checkUserLogin');
const checkAuth = require('../middlewares/checkAuth');
const perfilValidations = require('../../validations/perfilValidations')

const router = express.Router();
const upload = require('../middlewares/upload');

/* GET users listing. */
router
  .get('/ingreso', checkAuth, login)
  .post("/ingreso",userLogin, processLogin)
  .get('/registro', checkAuth, register)
  .post('/registro',userRegisterValidator, processRegister)
  .put('/update/:id', perfilValidations, upload.single('imagen'), update)
  .get('/perfil/', checkUserLogin, profile)
  .get("/salir", logout)
  
  
module.exports = router;


