const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos, validarArchivos } = require('../middlewares');
const { cargarArchivo, actualizarImagen, consultarImagen, actualizarImagenCloudinary} = require('../controller/uploads');
const { coleccionesPermitidas } = require('../helpers');

const router = Router();

router.post('/', validarArchivos, cargarArchivo);

router.put('/:coleccion/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarArchivos,
    validarCampos
], actualizarImagenCloudinary);

router.get('/:coleccion/:id',[
    check('id', 'No es un id valido').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
], consultarImagen);

module.exports = router;