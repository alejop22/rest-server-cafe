const { response, request } = require('express')

const Usuario = require('../models/usuario');

const getUsuarios = (req = request, res = response) => {
    res.json('get API - controlador');
}

const postUsuarios = async(req = request, res = response) => {
    const body = req.body;

    const usuario = new Usuario(body);

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