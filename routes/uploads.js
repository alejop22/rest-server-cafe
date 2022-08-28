const { Router } = require('express');
const { check } = require('express-validator');

const { cargarArchivo } = require('../controller/uploads');

const router = Router();

router.post('/', cargarArchivo);

module.exports = router;