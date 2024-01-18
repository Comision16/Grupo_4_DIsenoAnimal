module.exports = (req,res,next) => {
    if (req.session.userLogin) {
        res.locals.userLogin = req.session.userLogin       
    } else if (req.cookies.animalDeUs3r_Cancat) {
        res.locals.userLogin = req.cookies.animalDeUs3r_Cancat
    }
    next()
}
