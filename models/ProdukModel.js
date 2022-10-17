import { Sequelize } from "sequelize";
import db from "../config/database.js";

const {DataTypes} = Sequelize;

const Produk = db.define('produk', {
    id_produk: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    id_category: DataTypes.INTEGER,
    id_foto: DataTypes.INTEGER,
    name_produk: DataTypes.STRING,
    qty: DataTypes.INTEGER,
    desc: DataTypes.TEXT,
}, {
    freezeTableName:true
});

Produk.removeAttribute('id');

export default Produk;
(async() => {
    await db.sync();
})();