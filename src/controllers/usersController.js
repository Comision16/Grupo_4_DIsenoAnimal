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
                maxAge : 1000 * 60 * 5
            })


            return res.redirect ('/usuarios/perfil')

        }else{
            datosUsuario = req.session.userLogin ? req.session.userLogin : req.cookies.animalDeUs3r_Cancat;
            return res.render ('users/login', {
                errors : errors.mapped(),
                datosUsuario
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
            datosUsuario = req.session.userLogin ? req.session.userLogin : req.cookies.animalDeUs3r_Cancat;
            return res.render('users/register',{
                old : req.body,
                errors : errors.mapped(),
                datosUsuario
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

        datosUsuario = req.session.userLogin ? req.session.userLogin : req.cookies.animalDeUs3r_Cancat;

        const {email} = req.session.userLogin ? req.session.userLogin : req.cookies.animalDeUs3r_Cancat

        const users = leerJSON('users');
        
        const usuario = users.find( user => user.email == email)

        return res.render("users/perfil", {
            ...usuario,
            datosUsuario
        })
    },
    update : (req,res) => {       

        const errors = validationResult(req);
        const {name, email, mascota, especie} = req.body;
        const { id } = req.params;

        if(errors.isEmpty()) {
        
        const imagenDelete = req.file ? req.file.fieldname : null  ;

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
    
        const datosUsuario = userUpdate.find( user => user.id == id);
        req.session.userUpdate = datosUsuario

        return res.render("users/perfil", {
            ...datosUsuario,
            datosUsuario
            
        })

        }else {
            datosUsuario = req.session.userLogin ? req.session.userLogin : req.cookies.animalDeUs3r_Cancat;
            return res.render('users/perfil',{
                ...datosUsuario,
                old : req.body,
                errors : errors.mapped()
            })
        }
    },
    dashboardUsuarios: (req,res) => {
       return res.render('users/dashboardUsuarios')
    }
}
