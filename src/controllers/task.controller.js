import TaskModel from "../models/task.js"

export async function getTasks(req, res){
    try {
        const tasks = await TaskModel.find({user: req.user.id}).populate("user")
        return res.json(tasks)
    } catch (error) {
        console.log(error)
    }
}

export async function getTask(req, res){
    try {
        const task = await TaskModel.findById(req.params.id).populate("user")
        if(!task) return res.status(404).json({message: "Task not found"})
        return res.json(task)
    } catch (error) {
        console.log(error)
    }
}

export async function postTask(req, res){
    const {title, description} = req.body;
    try {
        const task = new TaskModel({
            title,
            description,
            user: req.user.id
        })
        const savedTask = await task.save()
        return res.json(savedTask)
    } catch (error) {
        console.log(error)
    }
}

export async function putTask(req, res){
    try {
        const updatedTask = await TaskModel.findByIdAndUpdate(req.params.id, req.body, {new: true})
        if(!updatedTask) return res.status(404).json({message: "Task not found"})
        return res.json(updatedTask)
    } catch (error) {
        console.log(error)
    }
}

export async function deleteTask(req, res){
    try {
        const deletedTask = await TaskModel.findByIdAndDelete(req.params.id)
        if(!deleteTask) return res.status(404).json({message: "Task not found"})
        return res.sendStatus(200)
    } catch (error) {
        console.log(error)
    }
}