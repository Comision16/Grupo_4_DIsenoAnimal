const db = require("../../database/models")
const createError = require("http-errors")

const bcryptjs = require('bcryptjs')

const listUser = async (req, res) => {
    try {
        const { count, rows } = await db.User.findAndCountAll({
            include: [{
                association: "pet",
                attributes: ["name"]
            }],
            attributes: ["id", "name", "email", "image"]
        })

        const usuarios = rows.map(usuario => {
            return {
                ...usuario.dataValues,
                pet: usuario.pet[0].name,
                detail: `${req.protocol}://${req.get("host")}/api/users/${usuario.id}`
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
            include: [{
                association: "pet",
                attributes: ["name"]
            }],
            attributes: ["id", "name", "email", "image"]
        })

        const customUser = {
            ...usuario.dataValues,
            image: `${req.protocol}://${req.get('host')}/images/${usuario.image}`,
            pet: usuario.pet[0].name
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
        const { name, email, password, mascota, especie } = req.body;

        if ([name, email, password, mascota, especie].includes(" " || undefined)) throw createError(400, "Todos los campos son obligatorios")

        const usuario = await db.User.create({
            name,
            email,
            password: bcryptjs.hashSync(password.trim(), 10),
            roleId: 2
        })
        const pet = await db.Pet.create({
            name: mascota,
            specieId: especie,
            userId: usuario.id
        })

        const user = {
            ...usuario.dataValues,
            password: "***",
            ...pet.dataValues
        }

        return res.status(200).json({
            ok: true,
            data: user
        })        
    } catch (error) {
        console.error('Error al procesar la solicitud:', error);
        return res.status(500).json({ ok: false, error: 'Error interno del servidor' });
    }
}

module.exports = {
    listUser,
    oneUser,
    crearUsuario
}