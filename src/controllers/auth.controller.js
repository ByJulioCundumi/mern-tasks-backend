import UserModel from "../models/user.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config.js";

export async function postRegister(req, res){
    const {username, email, password} = req.body;
    try {
        const match = await UserModel.findOne({email: email})
        if(match) return res.json({message: "This user already exist, try a new one"})

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
            res.json(found)
        })
    } catch (error) {
        console.log(error)
    }
}

export function postLogout(req, res){
    res.cookie("token", "", {expires: new Date(0)})
    return res.sendStatus(200)
}

export async function getProfile(req, res){
    try {
        const userFound = await UserModel.findById(req.user.id)
        if(!userFound) return res.status(404).json({message: "User not found"})

        return res.status(200).json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt
        })
    } catch (error) {
        console.log(error)
    }
}

// verificar token al calgar la pagina
export async function getVerifyToken(req, res){
    const {token} = req.cookies;
    if(!token) return res.status(401).json({message: "Unauthorized"})

    jwt.verify(token, SECRET_KEY, async (err, user)=>{
        if(err) return res.status(401).json({message: "Unauthorized"})

        try {
            const userFound = await UserModel.findById(user.id)
            if(!userFound) return res.status(401).json({message: "Unauthorized"})

            return res.json({
                id: userFound._id,
                username: userFound.username,
                email: userFound.email,
                createdAt: userFound.createdAt,
                updatedAt: userFound.updatedAt
            })
        } catch (error) {
            console.log(error)
        }
    })
}