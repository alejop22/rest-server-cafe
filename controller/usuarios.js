const { response, request } = require('express')

const getUsuarios = (req = request, res = response) => {
    res.json('get API - controlador');
}

const postUsuarios = (req = request, res = response) => {
    res.status(201).json('post API - controlador');
}

const putUsuarios = (req = request, res = response) => {
    res.json('put API - controlador');
}

const deleteUsuarios = (req = request, res = response) => {
    res.json('delete API - controlador');
}


module.exports = {
    getUsuarios,
    postUsuarios,
    putUsuarios,
    deleteUsuarios,
}