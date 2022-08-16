import { Sequelize } from "sequelize";
import db from '../config/database.js';

const {DataTypes} = Sequelize;

const Employee = db.define('employee', {
    id_employee: { type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    name_employee: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
}, {
    freezeTableName:true
});
Employee.removeAttribute('id');


export default Employee;

(async() => {
    await db.sync();
})();