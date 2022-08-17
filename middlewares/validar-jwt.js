const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');

const validarJWT = async(req = request, res = response, next) => {
    
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            msj: 'No hay token de autorizacion en la peticion'
        });
    }

    try {
        
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        // usuario autenticado
        const usuario = await Usuario.findById(uid); 
        if (!usuario) {
            return res.status(401).json({
                msj: 'Token no valido'
            });
        }

        if (!usuario.estado) {
            return res.status(401).json({
                msj: 'Token no valido'
            });
        }

        req.usuario = usuario;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msj: 'Token no valido'
        });
    }
}

module.exports = {
    validarJWT
}