const { Categoria, Usuario, Rol, Producto } = require('../models');

const roleValido = async(role = '') => {
    const existeRol = await Rol.findOne({role});
    if(!existeRol) {
        throw new Error(`El rol ${role} es invalido`);
    } 
}

const emailExiste = async(correo) => {
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error(`el correo ${correo} ya está registrado`);
    }
}

const usuarioExiste = async(id) => {
    const usuario = await Usuario.findById(id);
    if (!usuario) {
        throw new Error(`el id ${id} no existe`);
    }
}

const categoriaExiste = async(id) => {
    const categoria = await Categoria.findById(id);
    if (!categoria) {
        throw new Error(`La categoria con id ${id} no existe`);
    }
}

const productoExiste = async(id) => {
    const producto = await Producto.findById(id);
    if (!producto) {
        throw new Error(`El producto con id ${id} no existe`);
    }
}

const coleccionesPermitidas = (coleccion = '', colecciones = []) => {

    const validarColeccion = colecciones.includes(coleccion);
    if (!validarColeccion) {
        throw new Error(`La coleccion ${coleccion} no es permitida (${colecciones})`);
    }

    return true;
}

module.exports = {
    roleValido,
    emailExiste,
    usuarioExiste,
    categoriaExiste,
    productoExiste,
    coleccionesPermitidas
}