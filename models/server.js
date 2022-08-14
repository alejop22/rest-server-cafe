const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        // Conexión database
        this.conexionDB();

        // Middlewares
        this.middlewares();

        // Rutas
        this.routes();
    }

    async conexionDB() {
        await dbConnection();
    }

    middlewares() {
        // CORS
        this.app.use(cors());

        this.app.use(express.json());

        this.app.use( express.static('public') )
    }

    routes() {
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
    }

    listen() {
        this.app.listen(this.port, ()=> {
            console.log('web server funcionando melo ' + this.port);
        });
    }
}

module.exports = Server;