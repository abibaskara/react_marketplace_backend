import { Sequelize } from "sequelize";
import db from '../config/database.js';

const {DataTypes} = Sequelize;

const User = db.define('users', {
    id_employee: DataTypes.INTEGER,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    gender: DataTypes.STRING,
    refresh_token: DataTypes.TEXT,
}, {
    freezeTableName:true
});

export default User;

(async() => {
    await db.sync();
})();