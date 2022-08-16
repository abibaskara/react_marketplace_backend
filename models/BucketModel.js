import { Sequelize } from "sequelize";
import db from "../config/database.js";

const {DataTypes} = Sequelize;

const Bucket = db.define('bucket', {
    id_bucket: {type: DataTypes.INTEGER, autoIncrement:true, primaryKey:true},
    id_product: DataTypes.INTEGER,
    qty_bucket: DataTypes.INTEGER,
}, {
    freezeTableName: true
});

export default Bucket;

(async() => {
    await db.sync();
})();