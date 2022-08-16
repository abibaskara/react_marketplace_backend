import { Sequelize } from "sequelize";
import db from "../config/database.js";

const {DataTypes} = Sequelize;

const Category = db.define('category', {
    id_category: { type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    name_category: DataTypes.STRING,
}, {
    freezeTableName:true
});
Category.removeAttribute('id');

export default Category;

(async() => {
    await db.sync();
})();