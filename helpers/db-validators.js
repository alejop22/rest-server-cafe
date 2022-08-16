const Role = require('../models/rol');
const Usuario = require('../models/usuario');

const roleValido = async(role = '') => {
    const existeRol = await Role.findOne({role});
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

module.exports = {
    roleValido,
    emailExiste,
    usuarioExiste
}