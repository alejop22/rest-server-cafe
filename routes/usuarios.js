const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos,
        validarJWT,
        adminUser,
        tieneRol } = require('../middlewares');

const { roleValido, emailExiste, usuarioExiste } = require('../helpers/db-validators');
const { getUsuarios,
        postUsuarios,
        putUsuarios,
        deleteUsuarios } = require('../controller/usuarios');

const router = Router();

router.get('/', getUsuarios);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').exists(),
    check('password', 'La contraseña debe de tener minimo 6 caracteres').isLength({min: 6}),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( emailExiste ),
    // check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom( roleValido ), 
    validarCampos
], postUsuarios);

router.put('/:id',[
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( usuarioExiste ),
    validarCampos
], putUsuarios);

router.delete('/:id',[
    validarJWT,
    adminUser,
    // tieneRol('ADMIN_ROLE', 'VENTAS_ROLE') adminUser es solo para un rol y tieneRol para varios roles
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( usuarioExiste ),
    validarCampos
], deleteUsuarios);

module.exports = router;