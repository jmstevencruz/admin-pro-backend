// getTodo

const { response } = require("express");
const { models } = require("mongoose");

const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const getTodo = async (req, res = response) => {



    try {
        const busqueda = req.params.busqueda;
        const regex = new RegExp(busqueda, 'i');

        const [usuarios, medicos, hospitales] = await Promise.all([
            Usuario.find({ nombre: regex }),
            Medico.find({ nombre: regex }),
            Hospital.find({ nombre: regex })
        ]);
        res.json({
            ok: true,
            usuarios,
            medicos,
            hospitales
        });

    } catch (error) {
        console.log(error);
        res.json({
            ok: false,
            msg: 'Contacte con el administrador'
        });

    }


}

const getDocumentosColeccion = async (req, res = response) => {



        const table = req.params.tabla;
        const busqueda = req.params.busqueda;
        const regex = new RegExp(busqueda, 'i');

        let data = [];


        switch (table) {
            case 'medicos':
                data = await Medico.find({ nombre : regex}).populate('usuario', 'nombre img').populate('hospital', 'nombre img');           
                break;
            case 'hospitales':
                data = await Hospital.find({ nombre : regex}).populate('usuario', 'nombre img');
                break;
            case 'usuarios':
                data = await Usuario.find({ nombre : regex});
                break;

            default:
                res.status(400).json({
                    ok: false,
                    msg: 'La tabla tiene que ser usuarios/medicos/hospitales'
                });

                break;
        }
        res.json({
            ok: true,
            resultados : data
        });

       




}


module.exports = {
    getTodo,
    getDocumentosColeccion
}