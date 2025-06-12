import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI,{
            dbName : process.env.DB_NAME,
        });
        console.log("database connected")
    } catch (error) {
        console.log("database NOT connected")
    }
}