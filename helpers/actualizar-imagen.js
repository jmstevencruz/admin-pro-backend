const fs = require('fs');

const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const borrarImagen = ( path ) => {
   
    //Borrar la imagen vieja
    if (fs.existsSync(path)){
        fs.unlinkSync(path);
    }

}

const actualizarImagen = async (tipo, id, nombreArchivo) => {

    switch (tipo) {
        case 'medicos':
            {
            const medico = await Medico.findById(id);
            if (!medico) {
                console.log("No es un médico por id");
                return false;
            }
            const pathViejo = `./uploads/medicos/${medico.img}`;

            borrarImagen (pathViejo);           

            medico.img = nombreArchivo;
            await medico.save();
            return true;
            }
            break;
        case 'hospitales':
            {
            const hospital = await Hospital.findById(id);
            if (!hospital) {
                console.log("No es un hospital por id");
                return false;
            }
            const pathViejo = `./uploads/hospitales/${hospital.img}`;

            borrarImagen (pathViejo);           

            hospital.img = nombreArchivo;
            await hospital.save();
            return true;
            }
            break;
        case 'usuarios':
            {
            const usuario = await Usuario.findById(id);
            if (!usuario) {
                console.log("No es un usuario por id");
                return false;
            }
            const pathViejo = `./uploads/usuarios/${usuario.img}`;

            borrarImagen (pathViejo);           

            usuario.img = nombreArchivo;
            await usuario.save();
            return true;

            break;
            }   

        default:
            break;
    }

}

module.exports = {
    actualizarImagen
}