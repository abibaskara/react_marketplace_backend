import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import Cookies from "js-cookie";

export const refreshToken = async(req, res) => {
    try{
        const refreshToken = req.body.token;
        if(!refreshToken) return res.sendStatus(401);
        const user = await User.findAll({
            where: {
                refresh_token: refreshToken
            }
        });
        if(!user[0]) return res.sendStatus(403);
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if(err) return res.sendStatus(403);
            const userId = user[0].id;
            const id_employee = user[0].id_employee;
            const name = user[0].name;
            const email = user[0].email;
            const gender = user[0].gender;
            const accessToken = jwt.sign({userId, id_employee, name, email, gender}, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '20s'
            });
            res.json({ accessToken })
        })
    }catch(error) {
        console.log(error)
    }
}