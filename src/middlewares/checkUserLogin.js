<<<<<<< HEAD
const session = require("express-session");

module.exports = (req,res,next) => {
    if (req.session.userLogin) {
        req.locals.userLogin = req.session.userLogin                
    }
    next()
=======
module.exports = (req,res, next) => {
    if(req.session.userLogin){
        return next()
    }

    return res.redirect('/usuarios/ingreso')
>>>>>>> develop
}