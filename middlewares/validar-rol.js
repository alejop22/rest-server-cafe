const { request, response } = require("express");

const adminUser = (req = request, res = response, next) => {

    if (!req.usuario) {
        return res.status(500).json({
            msj: 'Se quiere validar el rol sin validar el token primero'
        });
    }

    const { rol, nombre } = req.usuario;
    if (rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msj: `${nombre} no es usuario administrador`
        });
    }

    next();
}

const tieneRol = (...roles) => {
    return (req = request, res = response, next) => {

        if (!req.usuario) {
            return res.status(500).json({
                msj: 'Se quiere validar el rol sin validar el token primero'
            });
        }

        if (!roles.includes(req.usuario.rol)) {
            return res.status(401).json({
                msj: `El servicio requiere uno de estos roles de usuario ${roles}`
            });
        }

        next();
    }
}

module.exports = {
    adminUser,
    tieneRol
}