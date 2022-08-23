const { request, response } = require("express");

const {Producto, Categoria} = require('../models')

const obtenerProductos = async(req = request, res = response) => {
    const {limite = 5, desde = 0} = req.query;
    const query = {estado:true}

    try {
        const [total, productos] = await Promise.all([
            Producto.countDocuments(query),
            Producto.find(query)
                .populate('usuario', 'nombre')
                .populate('categoria', 'nombre')
                .skip(Number(desde))
                .limit(Number(limite))
        ]);

        res.json({total, productos});
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msj: 'Algo salio mal'
        });
    }
}

const obtenerProducto = async(req = request, res = response) => {
    const {id} = req.params;

    try {
        const producto = await Producto.findById(id)
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre');

        res.json(producto);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msj: 'Algo salio mal'
        });
    }
}

const crearProducto = async(req = request, res = response) => {
    const categoria = req.body.categoria.toUpperCase();

    const { nombre, precio, descripcion = '' } = req.body;
    
    try {
        const productoDB = await Producto.findOne({nombre});
        if (productoDB) {
            return res.status(400).json({
                msj: 'El producto ya existe'
            });
        }
    
        const categoriaDB = await Categoria.findOne({nombre: categoria});
        if (!categoriaDB) {
            return res.status(400).json({
                msj: 'La categoria no existe'
            });
        }
    
        const data = {
            nombre,
            usuario: req.usuario._id,
            precio,
            categoria: categoriaDB,
            descripcion
        }
    
        const producto = new Producto(data);
        await producto.save();
    
        res.status(201).json(producto);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msj: 'Algo salio mal'
        });
    }
}

const actualizarProducto = async(req = request, res = response) => {
    const {id} = req.params;

    const {nombre, precio, descripcion, disponible = true} = req.body;

    try {
        const producto = await Producto.findByIdAndUpdate(id, {nombre, precio, descripcion, disponible}, {new:true})
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre');
        
        res.json(producto);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msj: 'Algo salio mal'
        });
    }
}

const eliminarProducto = async(req = request, res = response) => {
    const {id} = req.params;

    try {
        const producto = await Producto.findByIdAndUpdate(id, {estado: false}, {new:true})
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre');

        res.json(producto);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msj: 'Algo salio mal'
        });
    }
}

module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    eliminarProducto
}