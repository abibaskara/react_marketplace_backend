import Category from '../models/CategoryModel.js';
import Produk from '../models/ProdukModel.js';

export const getProduk = async(req, res) => {
    try {
        const response = await Produk.findAll({
            include: [{
                model: Category,
                as: 'Category'
            }
            ]
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getProdukById = async(req, res) => {
    try {
        const response = await Produk.findOne({
            where: {
                id_produk: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const createProduk = async(req, res) => {
    try {
        await Produk.create(req.body);
        res.status(201).json({
            message: 'Produk Created'
        });
    } catch (error) {
        console.log(error.message);
    }
}

export const updateProduk = async(req, res) => {
    try {
        await Produk.update(req.body, {
            where: {
                id_produk: req.params.id
            }
        });
        res.status(200).json({
            message: 'Produk Updated'
        });
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteProduk = async(req, res) => {
    try {
        await Produk.destroy({
            where: {
                id_produk: req.params.id
            }
        });
        res.status(200).json({
            message: 'Produk Deleted'
        });
    } catch (error) {
        console.log(error.message);
    }
}