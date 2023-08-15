import {connect} from "mongoose"
import {DB_USER, DB_NAME, DB_PASSWORD} from "./config.js"

async function connectDB(){
    try {
        await connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.41penyj.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Connected to the database successfully')
    } catch (error) {
        console.log(error)
    }
}

export default connectDB;