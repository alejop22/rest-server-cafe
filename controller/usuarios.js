const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator')

const Usuario = require('../models/usuario');

const getUsuarios = (req = request, res = response) => {
    res.json('get API - controlador');
}

const postUsuarios = async (req = request, res = response) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    const { nombre, correo, password, rol } = req.body;

    const usuario = new Usuario({ nombre, correo, password, rol });

    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        return res.status(400).json({
            msg: 'Ese correo ya está registrado'
        });
    }

    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    await usuario.save();

    res.status(201).json(usuario);
}

const putUsuarios = (req = request, res = response) => {
    res.json('put API - controlador');
}

const deleteUsuarios = (req = request, res = response) => {
    res.json('delete API - controlador');
}


module.exports = {
    getUsuarios,
    postUsuarios,
    putUsuarios,
    deleteUsuarios,
}