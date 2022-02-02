const { response } = require("express");
const hospital = require("../models/hospital");

const Hospital = require('../models/hospital');

const getHospitales = async (req, res = response) => {

    const hospitales = await Hospital.find({}).populate('usuario','nombre img');

    res.json({
        ok: true,
        hospitales
    });

} 
const crearHospitales = async(req, res = response) => {

    const uid = req.uid;

    const hospital = new Hospital( {
        usuario: uid,
        ...req.body} );
    

    //console.log(uid);

    try {

        const hospitalDB = await hospital.save();

        res.json({
            ok: true,
            hospital : hospitalDB
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
        
    }

    

} 

const actualizarHospitales = async (req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const hospitalDB = await Hospital.findById( id );

        if (!hospitalDB) {
            res.status(404).json({
                ok: false,
                msg: 'Hospital no encontrado'
            });
        }

        const cambiosHospital = {
            ...req.body,
            usuario: uid
        }

        const hospitalActualizado = await Hospital.findByIdAndUpdate ( id, cambiosHospital, {new : true});
        //hospital.nombre = req.body.nombre;

        res.json({
            ok: true,
            hospital: hospitalActualizado            
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
        
    }

   

} 
const borrarHospitales = async (req, res = response) => {

    const id = req.params.id;

    try {

        const hospitalDB = await Hospital.findById( id );

        if (!hospitalDB) {
            res.status(404).json({
                ok: false,
                msg: 'Hospital no encontrado'
            });
        }

       await Hospital.findByIdAndDelete( id );

        

        res.json({
            ok: true,
            msg: 'Hospital eliminado'            
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
        
    }

} 

module.exports = {
    getHospitales,
    crearHospitales,
    actualizarHospitales,
    borrarHospitales
}