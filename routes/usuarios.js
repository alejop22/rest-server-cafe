const { Router } = require('express');
const { check } = require('express-validator');
const { getUsuarios,
        postUsuarios,
        putUsuarios,
        deleteUsuarios } = require('../controller/usuarios');

const router = Router();

router.get('/', getUsuarios);

router.post('/', [
    check('correo', 'El correo no es valido').isEmail(),
    check('nombre', 'El nombre es obligatorio').exists(),
],postUsuarios);

router.put('/', putUsuarios);

router.delete('/', deleteUsuarios);

module.exports = router;