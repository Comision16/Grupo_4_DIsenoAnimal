const express = require('express');
const {login, register, processRegister, processLogin, logout, profile, update, dashboardUsuarios, gerarquia, reserva, reservar} = require('../controllers/usersController');
const userRegisterValidator = require('../../validations/user-register-validator');
const userLogin = require('../../validations/userLogin');
const checkUserLogin = require('../middlewares/checkUserLogin');
const checkAuth = require('../middlewares/checkAuth');

const router = express.Router();
const upload = require('../middlewares/upload');
const userPerfil = require('../../validations/userPerfil');

/* GET users listing. */
router
  .get('/ingreso', checkAuth, login)
  .post("/ingreso",userLogin, processLogin)
  .get('/registro', checkAuth, register)
  .post('/registro',userRegisterValidator, processRegister)
  .get('/perfil/', checkUserLogin, profile)
  .put('/update/:id', upload.single('imagen') , update)
  .get("/salir", logout)
  .get("/dashboardUsuarios", dashboardUsuarios)
  .put("/dashboardUsuarios/:id", gerarquia)
  .get("/reserva", reserva)
  .post("/reserva", reservar)
  
  
module.exports = router;


