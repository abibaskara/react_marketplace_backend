import Foto from "../models/FotoModel.js"

export const createFoto = async(req, res) => {
    try {
        await Foto.create(req.body);
        res.status(201).json({
            message: 'Foto Created'
        });
    } catch (error) {
        console.log(error.message);
    }
}

export const updateFoto = async(req, res) => {
    try {
        await Foto.update(req.body, {
            where: {
                id_foto: req.params.id
            }
        })
        res.status(200).json({
            message: 'Foto Updated'
        })
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteFoto = async(req, res) => {
    try {
        await Foto.destroy({
            where: {
                id_foto: req.params.id
            }
        });
        res.status(200).json({
            message: 'Foto Deleted'
        });
    } catch (error) {
        console.log(error.message);
    }
}