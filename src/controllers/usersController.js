const { validationResult } = require("express-validator");
const User = require("../data/User");
const Reserva = require("../data/reserva")
const { existsSync, unlinkSync } = require('fs');
const { leerJSON, escribirJSON } = require("../data");

const db = require("../database/models")

module.exports = {
    login : (req, res) => {
        return res.render('users/login')
        
    },
    processLogin : (req, res) => {
        
        const errors = validationResult(req);

        if(errors.isEmpty()){

        const dato = req.body

        console.log(dato);

            const {id, name, email, mascota, especie, imagen, role} = leerJSON('users').find(user => user.email == dato.email)

            req.session.userLogin = {
                id,
                name,
                email,
                mascota,
                especie,
                imagen,
                role
            }

            dato.remember && res.cookie('animalDeUs3r_Cancat', req.session.userLogin, {
                maxAge : 1000 * 60 * 60
            })

            return res.redirect ('/usuarios/perfil')

        }else{
            return res.render ('users/login', {
                errors : errors.mapped()
            })
        }
    },

    register : (req, res) => {
        return res.render('users/register', {
        })
    },

    processRegister : (req,res) => {
        const errors = validationResult(req);
        const {name, email, password} = req.body;

        if(errors.isEmpty()){

            const users = leerJSON('users');
            const newUser = new User(name, email, password);
            
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
        req.session.destroy();
        res.cookie('animalDeUs3r_Cancat',null,{
            maxAge : -1
        })

        return res.redirect("/")
    },
    profile : (req,res) => {    

        const imagenUser = req.session.userLogin
        

        const {email} = req.session.userLogin

        const users = leerJSON('users');
        
        const usuario = users.find( user => user.email == email)

        const especies = leerJSON("especie")

        return res.render("users/perfil", {
            ...usuario,
        imagenUser,
        especies
        })
    },
    update : (req,res) => {       
        const {name, email, mascota, especie} = req.body;
        const { id } = req.params;

        const errors = validationResult(req);

        if(errors.isEmpty()) {
        
        const imagenDelete = req.file ? req.file.fieldname : null  ;

        const usuarios = leerJSON('users');

        const userUpdate = usuarios.map(usuario => {
            if (usuario.id == id) {

            (imagenDelete && existsSync('public/images/' + usuario.imagen)) && unlinkSync('public/images/' + usuario.imagen)

            usuario.name = name.trim(),
            usuario.email = email.trim(),
            usuario.mascota = mascota.trim(),
            usuario.especie = especie,    
            usuario.imagen =  req.file ? req.file.filename : usuario.imagen            
            }           

            return usuario
        });        

        escribirJSON(userUpdate, 'users')  

        const users = leerJSON('users');

        const usuario = users.find( user => user.id == id)

        const especies = leerJSON("especie")

        return res.render("users/perfil", {
            old : req.body,
            ...usuario,
            especies
        })

        } else {
            const datosUsuario = req.session.userLogin

            console.log(datosUsuario);

            return res.render('users/perfil',{
                old : req.body,
                errors : errors.mapped(),
                ...datosUsuario
            })
        }
    },
    dashboardUsuarios : (req, res) => {
        const users = leerJSON('users');

        return res.render('dashboardUser', {
            users
        });
    },
    gerarquia : (req, res) => {
        const { id } = req.params;
        
        const users = leerJSON('users');

        const userUpdate = users.map(usuario => {
            if (usuario.id == id) {
                if (req.body.admin) {
                    usuario.role = "admin"                    
                } else {
                    usuario.role = "user"
                }
            }
            return usuario
        });

        escribirJSON(userUpdate, 'users')  

        return res.render('dashboardUser', {
            users
        });
    },
    reserva : (req, res) => {

        const imagenUser = req.session.userLogin        

        const {email} = req.session.userLogin

        const users = leerJSON('users');
        
        const usuario = users.find( user => user.email == email)

        const especies = leerJSON("especie")

        res.render("users/reserva", {
            old : req.body,
            ...usuario,
            imagenUser,
            especies
        })
    },
    reservar :(req, res) => {
        const {name, email, mascota, especie, fecha, hora } = req.body;

        const reserva = leerJSON('reserva');
        const newBooking = new Reserva(name, email,  mascota, especie, fecha, hora);
        
        reserva.push(newBooking);

        escribirJSON(reserva, 'reserva')

        const {id} = req.session.userLogin ? req.session.userLogin : 1

        const users = leerJSON('users');

        const usuario = users.find( user => user.id == id)
        

        return res.render("users/reservado", {...usuario} )
    }
}
