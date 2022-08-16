import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    
    const token = authHeader && authHeader.split(' ')[1]; //ini sama seperti if else
    console.log(token);
    if(token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if(err) return res.sendStatus(403);

        req.email = decoded.email;
        next();
    })
}