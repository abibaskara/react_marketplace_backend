import db from "./config/database.js";
import dotenv from "dotenv";
import express from "express";
// import cookieParser from "cookie-parser";
import cors from "cors";
import EmployeeRoute from "./routes/EmployeeRoute.js";
import UserRoute from './routes/UserRoute.js';
import User from "./models/UserModel.js";
import Employee from "./models/EmployeeModel.js";
import CategoryRoute from "./routes/CategoryRoute.js";
// import { Cookies } from "react-cookie";

dotenv.config();
const app = express();
app.use(cors({ credentials: true }));
// app.use(cookieParser());
// const reactCookies = new Cookies();

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

User.belongsTo(Employee, {foreignKey: 'id_employee',
as: 'Employee'});


app.listen(5000, ()=> console.log('Server running..'))