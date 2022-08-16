const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const getUsuarios = async(req = request, res = response) => {

    const {limite = 5, desde = 0} = req.query;
    const query = { estado: true }

    // La ventaja del promise.all es que ejecuta las promesas al mismo tiempo
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({total, usuarios});
}

const postUsuarios = async (req = request, res = response) => {

    const { nombre, correo, password, rol } = req.body;

    const usuario = new Usuario({ nombre, correo, password, rol });

    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    await usuario.save();

    res.status(201).json(usuario);
}

const putUsuarios = async(req = request, res = response) => {
    const { id } = req.params;

    const { password, google, correo, ...resto } = req.body;

    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json({usuario});

}

const deleteUsuarios = async(req = request, res = response) => {
    const {id} = req.params;

    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});

    res.json(usuario);
}


module.exports = {
    getUsuarios,
    postUsuarios,
    putUsuarios,
    deleteUsuarios,
}