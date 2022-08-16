const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
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
    check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    validarCampos
],postUsuarios);

router.put('/', putUsuarios);

router.delete('/', deleteUsuarios);

module.exports = router;