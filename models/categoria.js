const { Schema, model } = require('mongoose');

const CategoriaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'el nombre es obligatorio'],
    },
    estado: {
        type: Boolean,
        default: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        require: true
    }
});

CategoriaSchema.methods.toJSON = function() {
    const {__v, _id, ...categoria} = this.toObject();
    categoria.id = _id;
    return categoria;
}

module.exports = model('Categoria', CategoriaSchema);