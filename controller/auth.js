const { request, response } = require("express");

const login = (req = request, res = response) => {

    res.json({
        msj: 'melossss'
    });
}

module.exports = {
    login
}