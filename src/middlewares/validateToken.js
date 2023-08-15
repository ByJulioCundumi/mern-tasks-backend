import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config.js";

export async function validateToken(req, res, next){
    const {token} = req.cookies;
    if(!token) return res.status(401).json({message: "No token provided, access denied"})

    jwt.verify(token, SECRET_KEY, (err, user)=>{
        if(err) return res.status(403).json({message: "Invalid token"})
        req.user = user;
        next()
    })
}