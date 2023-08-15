import UserModel from "../models/user.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config.js";

export async function postRegister(req, res){
    const {username, email, password} = req.body;
    try {
        const newUser = new UserModel({
            username,
            email,
            password: await bcrypt.hash(password, 10)
        })
        const saved = await newUser.save()

        jwt.sign({id: saved._id}, SECRET_KEY, {expiresIn: "1d"}, 
        (err, token)=>{
            if(err) console.log(err)
            res.cookie("token", token)
            res.json({
                id: saved._id,
                username: saved.username,
                email: saved.email,
                createdAt: saved.createdAt,
                updatedAt: saved.updatedAt
            })
        })

    } catch (error) {
        console.log(error)
    }
}

export async function postLogin(req, res){
    const {email, password} = req.body;
    try {
        const found = await UserModel.findOne({email: email})
        if(!found) return res.status(404).json({message: "User not found"})

        const match = await bcrypt.compare(password, found.password)
        if(!match) return res.status(400).json({message: "Invalid password"})

        jwt.sign({id: found._id}, SECRET_KEY, {expiresIn: "1d"}, 
        (err, token)=>{
            if(err) console.log(err)
            res.cookie("token", token)
            res.json({message:"Loged Successfully"})
        })
    } catch (error) {
        console.log(error)
    }
}