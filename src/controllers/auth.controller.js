import UserModel from "../models/user.js"
import bcrypt from "bcryptjs"

export async function postRegister(req, res){
    const {username, email, password} = req.body;
    try {
        const newUser = new UserModel({
            username,
            email,
            password: await bcrypt.hash(password, 10)
        })
        const saved = await newUser.save()
        res.json({
            id: saved._id,
            username: saved.username,
            email: saved.email,
            createdAt: saved.createdAt,
            updatedAt: saved.updatedAt
        })
    } catch (error) {
        console.log(error)
    }
}

export async function postLogin(req, res){
    try {
        
    } catch (error) {
        console.log(error)
    }
}