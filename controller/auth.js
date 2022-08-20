const { request, response } = require("express");
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verify");

const login = async(req = request, res = response) => {

    const {correo, password} = req.body;
    try {
        
        const usuario = await Usuario.findOne({correo});
        if (!usuario) {
            return res.status(400).json({
                msj: 'correo / password incorrectos - correo'
            });
        }

        if (!usuario.estado) {
            return res.status(400).json({
                msj: 'correo / password incorrectos - estado'
            });
        }

        const validarPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validarPassword) {
            return res.status(400).json({
                msj: 'correo / password incorrectos - password'
            });
        }

        const token = await generarJWT(usuario.id);

        res.json({usuario, token});
    } catch (error) {
        console.log(error);
        res.status(500).json({msj: 'Algo salio mal'});
    }
}

const googleSignIn = async(req = request, res = response) => {
    
    const {id_token} = req.body;

    try {
        
        const googleUser = await googleVerify(id_token);
        res.json({googleUser});
        
    } catch (error) {
        res.status(400).json({
            ok: false,
            msj: 'El token no se pudo verificar'
        })
    }
}

module.exports = {
    login,
    googleSignIn
}