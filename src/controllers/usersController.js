const { validationResult } = require("express-validator");
const User = require("../data/User");
const { leerJSON, escribirJSON } = require("../data");

module.exports = {
    
    login : (req, res) => {
        return res.render('users/login')
        
    },
    processLogin : (req, res) => {
        
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
        
    }
}