const { Router } = require('express');
const { check } = require('express-validator');

const { crearProducto, obtenerProductos, obtenerProducto, actualizarProducto, eliminarProducto } = require('../controller/productos');
const { productoExiste } = require('../helpers/db-validators');

const { validarJWT, validarCampos, adminUser } = require('../middlewares')

const router = Router();

// publica
router.get('/', obtenerProductos);

// publica 
router.get('/:id',[
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( productoExiste ),
    validarCampos
],obtenerProducto);

//privada token
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').exists(),
    check('categoria', 'La categoria es obligatoria').exists(),
    validarCampos
],crearProducto);

// privada token
router.put('/:id', [
    validarJWT,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( productoExiste ),
    check('nombre', 'El nombre es obligatorio').exists(),
    check('precio', 'El precio es obligatorio').exists(),
    check('descripcion', 'La descripcion es obligatoria').exists(),
    validarCampos
],actualizarProducto);

// privada admin
router.delete('/:id',[
    validarJWT,
    adminUser,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( productoExiste ),
    validarCampos
],eliminarProducto);


module.exports = router;