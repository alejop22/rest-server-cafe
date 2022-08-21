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
        const {name: nombre, email: correo, picture: img} = await googleVerify(id_token);

        let usuario = await Usuario.findOne({correo});

        // Crear el usuario si no existe
        if (!usuario) {
            const data = {
                nombre,
                correo,
                password: ':P',
                img,
                google: true
            }

            usuario = new Usuario(data);

            // Encriptacion de contraseña
            const salt = bcryptjs.genSaltSync();
            usuario.password = bcryptjs.hashSync(data.password, salt);

            await usuario.save();
        }

        // Error si el usuario esta inhabilitado
        if(!usuario.estado) {
            res.status(401).json({
                msj: `El usuario ${correo} esta inhabilitado`
            });
        }

        // Generar el JWT
        const token = await generarJWT(usuario.id);

        res.json({usuario, token});

    } catch (error) {
        console.log(error);
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