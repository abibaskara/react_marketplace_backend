import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Foto = db.define('foto', {
    id_foto: {type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    id_produk: DataTypes.INTEGER,
    name_foto: DataTypes.STRING,
}, {
    freezeTableName: true,
});

Foto.removeAttribute('id');

export default Foto;
(async() => {
    await db.sync();
})();