module.exports = (req,res,next) => {
    if (req.cookies.animalDeUs3r_Cancat) {
        req.session.userlogin = req.cookies.animalDeUs3r_Cancat       
    } 
    next();
}