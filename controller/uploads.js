const path = require('path');
const fs = require('fs');

const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const { request, response } = require("express");

const { Usuario, Producto } = require('../models')
const { subirArchivo } = require('../helpers');


const cargarArchivo = async (req = request, res = response) => {

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

const actualizarImagen = async (req = request, res = response) => {
    const { id, coleccion } = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);

            if (!modelo) {
                return res.status(400).json({
                    msj: `El usuario con id ${id} no existe`
                });
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id);

            if (!modelo) {
                return res.status(400).json({
                    msj: `El producto con id ${id} no existe`
                });
            }
            break;
        default:
            return res.status(500).json({
                msj: 'Algo salio mal'
            });
    }

    try {
        if (modelo.img) {
            const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
            if (fs.existsSync(pathImagen)) {
                fs.unlinkSync(pathImagen);
            }
        }

        const archivo = await subirArchivo(req.files, undefined, coleccion);
        modelo.img = archivo;

        await modelo.save();
        res.json(modelo);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msj: 'Algo salio mal'
        });
    }
}

const actualizarImagenCloudinary = async (req = request, res = response) => {
    const { id, coleccion } = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);

            if (!modelo) {
                return res.status(400).json({
                    msj: `El usuario con id ${id} no existe`
                });
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id);

            if (!modelo) {
                return res.status(400).json({
                    msj: `El producto con id ${id} no existe`
                });
            }
            break;
        default:
            return res.status(500).json({
                msj: 'Algo salio mal'
            });
    }

    try {
        if (modelo.img) {
            const nombreImgArr = modelo.img.split('/');
            const nombreImg = nombreImgArr.at(-1).split('.').at(0);
            cloudinary.uploader.destroy(nombreImg);
        }

        const { tempFilePath } = req.files.archivo;
        const {secure_url} = await cloudinary.uploader.upload(tempFilePath); 

        modelo.img = secure_url;
        await modelo.save();

        res.json(modelo);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msj: 'Algo salio mal'
        });
    }
}

const consultarImagen = async(req = request, res = response) => {
    const { id, coleccion } = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);

            if (!modelo) {
                return res.status(400).json({
                    msj: `El usuario con id ${id} no existe`
                });
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id);

            if (!modelo) {
                return res.status(400).json({
                    msj: `El producto con id ${id} no existe`
                });
            }
            break;
        default:
            return res.status(500).json({
                msj: 'Algo salio mal'
            });
    }

    try {
        if (modelo.img) {
            const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
            if (fs.existsSync(pathImagen)) {
                return res.sendFile(pathImagen);
            }
        }

        const pathImagen = path.join(__dirname, '../assets/no-image.jpg');
        res.status(404).sendFile(pathImagen);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msj: 'Algo salio mal'
        });
    }
}

module.exports = {
    cargarArchivo,
    actualizarImagen,
    consultarImagen,
    actualizarImagenCloudinary
}