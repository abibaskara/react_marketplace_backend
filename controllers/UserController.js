import Employee from "../models/EmployeeModel.js";
import User from '../models/UserModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import SetCookie from "../cookie/setCookie.js";


export const getUsers = async(req, res) => {
    try{
        const response = await User.findAll({
            include: [{
                model: Employee,
                as: 'Employee'
            }
            ]
        });
        if(response.length > 0) {
            res.status(200).json(response);
        } else {
            res.status(200).json({
                message: 'Data User Tidak Ada'
            });
        }
        
    } catch(error) {
        console.log(error.message);
    }
}

export const getUsersById = async(req, res) => {
    try{
        const response = await User.findOne({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch(error) {
        console.log(error.message);
    }
}

export const Register = async(req, res) => {
    const {name, id_employee, email, password, confPassword, gender } = req.body;
    if(password !== confPassword) {
        return res.status(400).json({message: 'Password dan Confirm Password Tidak Sama'});
    } else {
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt);
        try{
            await User.create(
                {
                    name: name,
                    id_employee: id_employee,
                    email: email,
                    password: hashPassword,
                    gender: gender,
                });
            res.status(201).json({message: 'User Success Registered'});
        } catch(error) {
            console.log(error.message);
        }
    }
}

export const updateUser = async(req, res) => {
    try{
        await User.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({message: 'User Updated'});
    } catch(error) {
        console.log(error.message);
    }
}

export const deleteUser = async(req, res) => {
    try{
        await User.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({message: 'User Deleted'});
    } catch(error) {
        console.log(error.message);
    }
}

export const Login = async(req, res) => {
    try{
        const user = await User.findAll({
            where: {
                email: req.body.email
            }
        });
        const match = await bcrypt.compare(req.body.password, user[0].password);
        if(!match) return res.status(400).json({message: "Wrong Password"});
        const userId = user[0].id;
        const id_employee = user[0].id_employee;
        const name = user[0].name;
        const gender = user[0].gender;
        const email = user[0].email;
        const accessToken = jwt.sign({userId, id_employee, name, gender, email}, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '20s'
        })
        const refreshToken = jwt.sign({userId, id_employee, name, gender, email}, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        })
        await User.update({refresh_token:refreshToken}, {
            where: {
                id: userId,
            }
        });
        // res.cookie('refreshToken', refreshToken, {
        //     httpOnly:true,
        //     path: '/'
        // });
        // console.log(refreshToken);
        SetCookie('refreshToken', JSON.stringify(refreshToken))
        res.json({accessToken, refreshToken});
        
    }catch(error) {
        res.status(404).json({message: "Email Not Found"});
    }
}

export const Logout = async(req, res) => {
    const refreshToken = req.headers['authorization'];
    console.log(refreshToken);
    const token = refreshToken && refreshToken.split(' ')[1];
    if(!token) return res.sendStatus(204);
    const user = await User.findAll({
        where: {
            refresh_token: token
        }
    });
    if(!user[0]) return res.sendStatus(204);

    const userId = user[0].id;
    await User.update({refresh_token: null}, {
        where: {
            id: userId
        }
    });
    return res.sendStatus(200);
}