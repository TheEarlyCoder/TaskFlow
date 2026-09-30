import mongoose from "mongoose"
import { DB_NAME } from "../constants.js"

const connectDB = async()=> {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`MONGO DB CONNECTED SUCCESSFULLY \nHOST: ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("Mongo DB Connection Failed!! ERR: ",error)
    }
}

export default connectDB;