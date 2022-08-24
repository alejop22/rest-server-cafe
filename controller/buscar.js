const { request, response, json } = require("express");
const { ObjectId } = require('mongoose').Types;

const {Usuario, Categoria, Producto, Rol} = require('../models');

const colecciones = ['usuarios', 'categorias', 'productos', 'roles'];

const buscarUsuario = async(termino, res) => {
    const idMongo = ObjectId.isValid(termino);
    
    try {
        if (idMongo) {
            const usuario = await Usuario.findById(termino);
            return res.json({
                results: usuario ? [usuario] : []
            });
        }
        
        // Expresion regular que quita el case sensitive
        const regex = new RegExp(termino, 'i');

        const usuario = await Usuario.find({
            $or: [{nombre: regex}, {correo: regex}],
            $and: [{estado: true}]
        });

        return res.json({
            results: usuario
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msj: 'Algo salio mal'
        });
    }
}

const buscarCategoria = async(termino, res) => {
    const idMongo = ObjectId.isValid(termino);

    try {
        if (idMongo) {
            const categoria = await Categoria.findById(termino).populate('usuario', 'nombre');

            return res.json({
                results: categoria ? [categoria] : []
            });
        }

        const regex = RegExp(termino, 'i');

        const categorias = await Categoria.find({nombre: regex, estado:true}).populate('usuario', 'nombre');

        return res.json({
            results: categorias
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msj: 'Algo salio mal'
        });
    }
}

const buscarPorducto = async(termino, res) => {
    const idMongo = ObjectId.isValid(termino);

    try {
        if (idMongo) {
            const producto = await Producto.findById(termino)
                .populate('usuario', 'nombre')
                .populate('categoria', 'nombre');
            
            return res.json({
                results: producto ? [producto] : []
            });
        }

        const regex = RegExp(termino, 'i');

        const productos = await Producto.find({nombre: regex, estado: true})
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre');
        
        return res.json({
            results: productos
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msj: 'Algo salio mal'
        });
    }
}

const buscarRole = async(termino, res) => {
    const idMongo = ObjectId.isValid(termino);

    try {
        if (idMongo) {
            const role = await Rol.findById(termino);

            return res.json({
                results: role ? [role] : []
            });
        }

        const regex = RegExp(termino, 'i');

        const roles = await Rol.find({role: regex});
        
        return res.json({
            results: roles
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msj: 'Algo salio mal'
        });
    }
}

const buscar = (req = request, res = response) => {
    const {coleccion, termino} = req.params;

    if (!colecciones.includes(coleccion)) {
        return res.status(400).json({
            msj: `Las colecciones validas son: ${colecciones}`
        });
    }

    switch (coleccion) {
        case 'usuarios':
            buscarUsuario(termino, res);
            break;
        case 'categorias':
            buscarCategoria(termino, res);
            break;
        case 'productos':
            buscarPorducto(termino, res);
            break;
        case 'roles':
            buscarRole(termino, res);
            break;
        default:
            res.status(500).json({
                msj: 'Algo salio mal'
            });
        break;
    }
}

module.exports = {
    buscar
}