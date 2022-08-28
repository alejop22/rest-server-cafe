const path = require('path');
const { v4: uuidv4 } = require('uuid');

const subirArchivo = (files, extensionesValidas = ['jpg', 'png', 'jpeg', 'gif'], nombreCarpetaPath = '') => {

    return new Promise((resolve, reject) => {

        const { archivo } = files;
        const nombreCortado = archivo.name.split('.');
        const extensionArchivo = nombreCortado[nombreCortado.length - 1];

        if (!extensionesValidas.includes(extensionArchivo)) {
            return reject(`La extension ${extensionArchivo} no esta permitida (${extensionesValidas})`);
        }

        const nombreTemp = `${uuidv4()}.${extensionArchivo}`;
        // En este caso el dirname llega hasta la carpeta controller
        const uploadPath = path.join(__dirname, '../uploads/', nombreCarpetaPath, nombreTemp);

        archivo.mv(uploadPath, (err) => {
            if (err) {
                return reject(err)
            }

            resolve(nombreTemp);
        });

    });
}

module.exports = {
    subirArchivo
}