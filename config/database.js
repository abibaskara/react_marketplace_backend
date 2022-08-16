import {Sequelize} from "sequelize";

const db = new Sequelize('crud_db','root','Indosat2022', {
    host: 'localhost',
    dialect: 'mysql'
});

export default db;