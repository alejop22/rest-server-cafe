const { response } = require("express");

const validarArchivos = (req = response, res = response, next) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(400).json({
            msj: 'No hay archivos en la peticion'
        });
    }

    next();
}

module.exports = {
    validarArchivos
}