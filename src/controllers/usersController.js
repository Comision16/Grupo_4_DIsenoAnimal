const { validationResult } = require("express-validator");
const User = require("../data/User");
const { leerJSON, escribirJSON } = require("../data");

module.exports = {
    
    login : (req, res) => {
        return res.render('users/login')
        
    },
    processLogin : (req, res) => {
        const errors = validationResult(req);
        const dato = req.body

        if(errors.isEmpty()){

            const {id, name, email, mascota, especie} = leerJSON('users').find(user => user.email == dato.email)

            req.session.userLogin = {
                id,
                name,
                email,
                mascota,
                especie,
            }


            return res.redirect ('/usuarios/perfil')

        }else{
            return res.render ('users/login', {
                errors : errors.mapped()
            })
        }
    },

    register : (req, res) => {
        return res.render('users/register')
    },

    processRegister : (req,res) => {
        const errors = validationResult(req);
        const {name, email, password, password2} = req.body;

        if(errors.isEmpty()){

            const users = leerJSON('users');
            const newUser = new User(name, email, password, password2);
            
            users.push(newUser);

            escribirJSON(users, 'users')

            return res.redirect('/usuarios/ingreso')
            

        }else{
            return res.render('users/register',{
                old : req.body,
                errors : errors.mapped()
            })
        }

    },
    logout :  (req, res) => {

    },
    profile : (req,res) => {        
        
        const usuario = req.session.userLogin

        return res.render("users/perfil", {
            ...usuario
        })
    },
    update : (req,res) => {       

        const {name, email, mascota, especie} = req.body;
        const { id } = req.params;

        const usuarios = leerJSON('users');

        const userUpdate = usuarios.map(usuario => {

            if (usuario.id == id) {

            usuario.name = name.trim(),
            usuario.email = email.trim(),
            usuario.mascota = mascota.trim(),
            usuario.especie = especie.trim()                
            }           

            req.session.userUpdate = usuario
            return usuario
        });

        escribirJSON(userUpdate, 'users')    
        
        const datosUsuario = req.session.userUpdate

        return res.render("users/perfil", {
            ...datosUsuario
        })
    }
}