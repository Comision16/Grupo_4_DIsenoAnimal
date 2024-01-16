module.exports = (req,res, next) => {
    if(req.session.userLogin){
        return res.redirect('/usuarios/registro')
    }
    return next()

}