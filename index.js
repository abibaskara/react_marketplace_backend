import db from "./config/database.js";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import EmployeeRoute from "./routes/EmployeeRoute.js";
import UserRoute from './routes/UserRoute.js';
import User from "./models/UserModel.js";
import Employee from "./models/EmployeeModel.js";
import CategoryRoute from "./routes/CategoryRoute.js";
import ProdukRoute from './routes/ProdukRoute.js'
import Produk from "./models/ProdukModel.js";
import Category from "./models/CategoryModel.js";
import FotoRoute from './routes/FotoRoute.js';

dotenv.config();
const app = express();
app.use(cors({ credentials: true }));

try{
    await db.authenticate();
    console.log('Database Connected...');
    await User.sync();
} catch(error) {
    console.log(error);
}


app.use(express.json());
app.use(EmployeeRoute);
app.use(UserRoute);
app.use(CategoryRoute);
app.use(ProdukRoute);
app.use(FotoRoute);

User.belongsTo(Employee, {foreignKey: 'id_employee',
as: 'Employee'});

Produk.belongsTo(Category, {foreignKey: 'id_category',
as: 'Category'});


app.listen(5000, ()=> console.log('Server running..'))