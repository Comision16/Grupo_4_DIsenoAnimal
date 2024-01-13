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

    processRegister : (req, res) => {
       
    },
    logout :  (req, res) => {

    },
    profile : (req,res) => {
        return res.render("users/perfil")
    }
}