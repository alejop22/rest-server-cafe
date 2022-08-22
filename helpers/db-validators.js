const { Categoria, Usuario, Rol } = require('../models');

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

module.exports = {
    roleValido,
    emailExiste,
    usuarioExiste,
    categoriaExiste
}