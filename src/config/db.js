import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config();

const connectDB = async ()=>{
    try{
        const connect = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB connected: ${connect.connection.host}`)

    }catch(error){
        console.error("DB connection error:", error.message)
    }
}
export default connectDB;