const { validationResult } = require("express-validator");
/* const User = require("../data/User"); */
/* const Reserva = require("../data/reserva") */
const { existsSync, unlinkSync } = require('fs');
const db = require("../database/models")
const bcryptjs = require('bcryptjs')


module.exports = {
    login: (req, res) => {
        return res.render('users/login')

    },
    processLogin: (req, res) => {

        const errors = validationResult(req);
        const { email, remember } = req.body

        if (errors.isEmpty()) {


            db.User.findOne({
                where: {
                    email
                }
            })

                .then(({ id, name, email, roleId, image }) => {
                    req.session.userLogin = {
                        id,
                        name,
                        email,
                        image,
                        role: +roleId
                    }
                    remember && res.cookie('animalDeUs3r_Cancat', req.session.userLogin, {
                        maxAge: 1000 * 60 * 60
                    })
                    return res.redirect('/usuarios/perfil')
                })
                .catch(error => console.log(error))

        } else {
            return res.render('users/login', {
                errors: errors.mapped()
            })
        }
    },

    register: (req, res) => {

        db.Specie.findAll()
        .then(especies => {
            return res.render('users/register', {
            especies
        })
        })      
        
    },

    processRegister: (req, res) => {
        const errors = validationResult(req);
        const { name, email, password, mascota, especie } = req.body;

        if (errors.isEmpty()) {

            db.User.create({
                name,
                email,
                password: bcryptjs.hashSync(password.trim(), 10),
                roleId: 2,
                mascota: ""
            })
                .then((user) => {

                    db.Pet.create({
                        name : "",
                        specieId : 6,
                        userId : user.id
                    })

                    return res.redirect('/usuarios/ingreso')
                })



        } else {

            db.Specie.findAll()
            .then((especies) => {               
            
            return res.render('users/register', {
                old: req.body,
                errors: errors.mapped(),
                especies
            })
            })
        }

    },
    logout: (req, res) => {
        req.session.destroy();
        res.cookie('animalDeUs3r_Cancat', null, {
            maxAge: -1
        })

        return res.redirect("/")
    },
    profile: (req, res) => {

        /* var imagenUser = req.session.userLogin */
        const { id } = req.session.userLogin

        const usuario = db.User.findByPk(id, {
            include: ["pet"]
        })

        const especies = db.Specie.findAll()

        const mascotas = db.Pet.findOne({
            where: {
                userId: id
            },
            include: ["user"]
        })

        Promise.all([usuario, especies, mascotas])

            .then(([usuario, especies, mascotas]) => {
                /* return res.send(usuario) */

                return res.render("users/perfil", {
                    usuario,
                    mascotas,
                    especies
                })
            })
            .catch(error => console.log(error))
    },

    update: (req, res) => {
        const { name, email, mascota, especie } = req.body;
        const errors = validationResult(req);
        const {id} = req.params

        if (errors.isEmpty()) {

            const imagenDelete = req.file ? req.file.fieldname : null;
            db.User.findByPk(req.params.id, {
                include: ["pet"]
            })
                .then((user) => {
                    (imagenDelete && existsSync('public/images/' + user.image)) &&
                        unlinkSync('public/images/' + user.image)

                    db.User.update({
                        name,
                        email,
                        image: req.file ? req.file.filename : user.image
                    },
                        {
                            where: {
                                id : req.params.id
                            }
                        })
                        .then(() => {
                            db.Pet.update({
                                name: mascota,
                                specieId: especie
                            },
                                {
                                    where: {
                                        userId: id
                                    }
                                })
                                .then(() => {
                                    const { id } = req.session.userLogin

                                    const usuario = db.User.findByPk(id, {
                                        include: ["pet"]
                                    })

                                    const especies = db.Specie.findAll()

                                    const mascotas = db.Pet.findOne({
                                        where: {
                                            userId: id
                                        },
                                        include: ["user"]
                                    })

                                    Promise.all([usuario, especies, mascotas])

                                        .then(([usuario, especies, mascotas]) => {

                                            return res.render("users/perfil", {
                                                usuario,
                                                mascotas,
                                                especies
                                            })
                                        })
                                })
                        })
                })
                .catch(error => console.log(error))
                
        } else {
            const datosUsuario = req.session.userLogin

            var imagenUser = req.session.userLogin
            const { id } = req.session.userLogin

            const usuario = db.User.findByPk(id, {
                include: ["pet"]
            })

            const especies = db.Specie.findAll()

            const mascotas = db.Pet.findOne({
                where: {
                    userId: id
                },
                include: ["user"]
            })

            Promise.all([usuario, especies, mascotas])

                .then(([usuario, especies, mascotas]) => {

                    return res.render('users/perfil', {
                        old: req.body,
                        errors: errors.mapped(),
                        ...datosUsuario,
                        usuario,
                        mascotas,
                        especies
                    })
                })
                .catch(error => console.log(error))
        }
    },


    dashboardUsuarios: (req, res) => {

        db.User.findAll()
            .then(users => {
                return res.render('dashboardUser', {
                    users
                });
            })


    },

    gerarquia: (req, res) => {
        const { id } = req.params;

        db.User.update({
            roleId: req.body.admin ? 1 : 2
        },
            {
                where: {
                    id
                }
            })

        db.User.findAll()
            .then(users => {
                return res.render('dashboardUser', {
                    users
                });
            })
    },

    reserva: (req, res) => {

        const { id } = req.session.userLogin

        const usuario = db.User.findByPk(id, {
            include: ["pet"]
        })

        const especies = db.Specie.findAll()

        const mascotas = db.Pet.findOne({
            where: {
                userId: id
            },
            include: ["user"]
        })

        Promise.all([usuario, especies, mascotas])

            .then(([usuario, especies, mascotas]) => {

                return res.render("users/reserva", {
                    usuario,
                    mascotas,
                    especies
                })
            })
            .catch(error => console.log(error))
    },

    reservar: (req, res) => {

        const { id } = req.session.userLogin

        const { name, email, mascota, especie, fecha, hora, petId } = req.body;

        db.Booking.create({
            name: mascota,
            date_and_time: fecha,
            petId
        })

        db.User.findByPk(id)
            .then(usuario => {
                return res.render("users/reservado", { ...usuario.dataValues })
            })

    }
}
