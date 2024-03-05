const db = require("../../database/models")

const listUser = async (req, res) => {
    try {
        const { count, rows } = await db.User.findAndCountAll({
            include : [{
                association : "pet",
                attributes : ["name"]
            }],
            attributes : ["id", "name", "email", "image"]
        })

        const usuarios = rows.map(usuario => {
            return {
                ...usuario.dataValues,
                pet : usuario.pet[0].name,
                detail : `${req.protocol}://${req.get("host")}/api/users/${usuario.id}`
            }

        })

        return res.status(200).json({
            ok: true,
            cantidad: count,
            data: usuarios
        })

    } catch (error) {
        console.error('Error al procesar la solicitud:', error);
        return res.status(500).json({ ok: false, error: 'Error interno del servidor' });
    }
}

const oneUser = async (req, res) => {
    try {

        const usuario = await db.User.findByPk(req.params.id, {
            include : [{
                association : "pet",
                attributes : ["name"]
            }],
            attributes : ["id", "name", "email", "image"]
        })

        const customUser = {
            ...usuario.dataValues,
            image : `${req.protocol}://${req.get('host')}/images/${usuario.image}`,
            pet : usuario.pet[0].name
        }

        return res.status(200).json({
            ok: true,
            data: customUser
        })

        
    } catch (error) {
        console.error('Error al procesar la solicitud:', error);
        return res.status(500).json({ ok: false, error: 'Error interno del servidor' });
    }
}

const crearUsuario = async (req, res) => {

    try {
    const { name, email, password } = req.body;

        db.User.create({
            name,
            email,
            password: bcryptjs.hashSync(password.trim(), 10),
            roleId: 2,
            mascota: "",
            especie: "",
            imagen: ""
        })
            .then(user => {
                return res.redirect('/usuarios/ingreso')
            })

            
    } catch (error) {
        
    }
}

module.exports = {
    listUser,
    oneUser,
    crearUsuario
}