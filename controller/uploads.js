const { request, response } = require("express");

const { subirArchivo } = require('../helpers');


const cargarArchivo = async(req = request, res = response) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(400).json({
            msj: 'No hay archivos en la peticion'
        });
    }

    // Subir solo imagenes
    try {
        const nombreArchivo = await subirArchivo(req.files, ['txt', 'md']);

        res.json({
            nombreArchivo
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msj: error
        });
    }
}

module.exports = {
    cargarArchivo
}