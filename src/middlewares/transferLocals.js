module.exports = (req, res, next) => {
   if(req.session.userLogin){
        res.locals.userLogin
        console.log('hasta aca llega')
    }
    next()
}