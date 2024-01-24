const express = require('express');
const {login, register, processRegister, processLogin, logout, profile, update, dashboardUsuarios, gerarquia} = require('../controllers/usersController');
const userRegisterValidator = require('../../validations/user-register-validator');
const userLogin = require('../../validations/userLogin');
const checkUserLogin = require('../middlewares/checkUserLogin');
const checkAuth = require('../middlewares/checkAuth');
const perfilValidations = require('../../validations/perfilValidations')

const router = express.Router();
const upload = require('../middlewares/upload');
const userPerfil = require('../../validations/userPerfil');

/* GET users listing. */
router
  .get('/ingreso', checkAuth, login)
  .post("/ingreso",userLogin, processLogin)
  .get('/registro', checkAuth, register)
  .post('/registro',userRegisterValidator, processRegister)
  .put('/update/:id', upload.single('imagen'), userPerfil, update)
  .get('/perfil/', checkUserLogin, perfilValidations, profile)
  .get("/salir", logout)
  .get("/dashboardUsuarios", dashboardUsuarios)
  .put("/dashboardUsuarios/:id", gerarquia)
  
  
module.exports = router;


