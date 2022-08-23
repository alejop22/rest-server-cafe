const { request, response } = require("express");
const { Categoria } = require('../models');

const obtenerCategorias = async(req = request, res = response) => {
    const {limite = 5, desde = 0} = req.query;
    const query = {estado:true}

    try {
        const [total, usuarios] = await Promise.all([
            // obtiene la cantidad de categorias que tengan el estado en true
            Categoria.countDocuments(query),
            Categoria.find(query)
                .populate('usuario') // join con el module o coleccion usuario
                .skip(Number(desde))
                .limit(Number(limite))
        ]);
    
        res.json({total, usuarios});
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msj: 'Algo salio mal'
        });
    }
}

const obtenerCategoria = async(req = request, res=response) => {
    const {id} = req.params;

    try {

        const categoria = await Categoria.findById(id).populate('usuario');
        res.json(categoria);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msj: 'Algo salio mal'
        });
    }
}

const crearCategoria = async (req = request, res = response) => {

    const nombre = req.body.nombre.toUpperCase();

    try {
        const categoriasDB = await Categoria.findOne({ nombre });

        if (categoriasDB) {
            res.status(400).json({
                msj: `La categoria ${nombre} ya existe`
            });
        }

        const data = {
            nombre,
            usuario: req.usuario._id
        }

        const categoria = new Categoria(data);

        await categoria.save();

        res.status(201).json({ categoria });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msj: 'Algo salio mal'
        });
    }
}

const actualizarCategoria = async(req = request, res = response) => {
    const { id } = req.params;
    const nombre = req.body.nombre.toUpperCase();

    try {     
        const categoria = await Categoria.findByIdAndUpdate(id, {nombre}, {new: true}).populate('usuario', 'nombre');
    
        res.json(categoria);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msj: 'Algo salio mal'
        });
    }
}

const borrarCategoria = async(req = request, res = response) => {
    const { id } = req.params;

    try {
        const categoria = await Categoria.findByIdAndUpdate(id, {estado: false}, {new: true}).populate('usuario');
    
        res.json(categoria);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msj: 'Algo salio mal'
        });
    }
}


module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria
}