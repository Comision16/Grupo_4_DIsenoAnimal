const { validationResult } = require("express-validator");
const User = require("../data/User");
const { existsSync, unlinkSync } = require('fs');
const { leerJSON, escribirJSON } = require("../data");

module.exports = {
    
    login : (req, res) => {
        return res.render('users/login')
        
    },
    processLogin : (req, res) => {
        const errors = validationResult(req);
        const dato = req.body

        if(errors.isEmpty()){

            const {id, name, email, mascota, especie, imagen} = leerJSON('users').find(user => user.email == dato.email)

            req.session.userLogin = {
                id,
                name,
                email,
                mascota,
                especie,
                imagen
            }

            dato.remember && res.cookie('animalDeUs3r_Cancat', req.session.userLogin, {
                maxAge : 1000 * 60 * 5
            })


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

        const {email} = req.session.userLogin

        const users = leerJSON('users');
        
        const usuario = users.find( user => user.email == email)

        return res.render("users/perfil", {
            ...usuario
        })
    },
    update : (req,res) => {       

        const {name, email, mascota, especie} = req.body;
        const { id } = req.params;

        
        const imagenDelete = req.file.imagen;

        console.log(imagenDelete);

        const usuarios = leerJSON('users');
        const userUpdate = usuarios.map(usuario => {
            if (usuario.id == id) {

            (imagenDelete && existsSync('public/images/' + usuario.imagen)) && unlinkSync('public/images/' + usuario.imagen)

            usuario.name = name.trim(),
            usuario.email = email.trim(),
            usuario.mascota = mascota.trim(),
            usuario.especie = especie.trim(),    
            usuario.imagen =  req.file ? req.file.filename : usuario.imagen            
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