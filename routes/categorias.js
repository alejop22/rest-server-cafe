const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, adminUser } = require('../middlewares');
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria } = require('../controller/categorias');
const { categoriaExiste } = require('../helpers/db-validators');

const router = Router();

// Obtener todas las categorias endpoint publico
router.get('/', obtenerCategorias);

// Obtener una categoria por id endpoint publico
router.get('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( categoriaExiste ),
    validarCampos
],obtenerCategoria);

// Crear categoria endpoint privado usuario con token valido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').exists(),
    validarCampos
], crearCategoria);

// actualizar categoria endpoint privado usuario con token valido
router.put('/:id', [
    validarJWT,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( categoriaExiste ),
    check('nombre', 'El nombre es obligatorio').exists(),
    validarCampos
],actualizarCategoria);

// borrar categoria endpoint privado Admin
router.delete('/:id',[
    validarJWT,
    adminUser,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( categoriaExiste ),
    validarCampos
],borrarCategoria);

module.exports = router;