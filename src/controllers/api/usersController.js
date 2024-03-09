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

const editarUsuario = async (req, res) => {

    try {
        const { name, email, mascota, especie } = req.body;
        const { id } = req.params

        if (isNaN(req.params.id)) throw createError(404, "no se el usuario")
        if ([name, email, mascota, especie].includes("" || undefined)) throw createError(400, "Todos los campos son obligatorios")

        const usuario = await db.User.findByPk(id)

        if (!usuario) throw createError(404, "no se encientra el usuario")

        usuario.name = name?.trim() || usuario.name
        usuario.email = email?.trim() || usuario.email

        usuario.save()

        const mascotas = await db.Pet.findOne({
            where: {
                userId: id
            }
        })

        mascotas.name = mascota?.trim() || mascotas.name
        mascotas.specieId = especie || mascotas.specieId
        mascotas.userId = usuario.id || mascotas.userId

        mascotas.save()

        const user = {
            ...usuario.dataValues,
            ...mascotas.dataValues
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

const borrarUsuario = async (req, res) => {
    try {

        const { id } = req.params

        const mascotas = await db.Pet.destroy({
            where : {
                userId : id
            }
        })

        const usuario = await db.User.destroy({
            where : {
                id
            }
        })

        const user = {
            ...usuario.dataValues,
            ...mascotas.dataValues
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
    crearUsuario,
    editarUsuario,
    borrarUsuario
}