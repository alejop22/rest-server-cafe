const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: '/api/auth',
            usuarios: '/api/usuarios',
            categorias: '/api/categorias',
            productos: '/api/productos'
        }

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
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.usuarios, require('../routes/usuarios'));
        this.app.use(this.paths.categorias, require('../routes/categorias'));
        this.app.use(this.paths.productos, require('../routes/productos'));
    }

    listen() {
        this.app.listen(this.port, ()=> {
            console.log('web server listen on port ' + this.port);
        });
    }
}

module.exports = Server;