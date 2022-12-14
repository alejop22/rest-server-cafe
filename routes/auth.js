const { Router } = require('express');
const { check } = require('express-validator');

const { login, googleSignIn } = require('../controller/auth');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/login',[
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').exists(),
    validarCampos
],login);

router.post('/google',[
    check('id_token', 'El id_token es obligatorio').exists(),
    validarCampos
],googleSignIn );


module.exports = router;