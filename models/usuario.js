const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

// Sobreescribo el metodo toJSON para sacar del objeto toObject dos atributos que no quiero ver en la respuesta de la ruta
UsuarioSchema.methods.toJSON = function() {
    const {__v, password, ...usuario} = this.toObject();
    return usuario;
}

// Recibe el nombre de la coleccion y el schema
module.exports = model('Usuario', UsuarioSchema)