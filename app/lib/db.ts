import mongoose from "mongoose";

let connection: typeof mongoose;

const url = process.env.DB_KEY;

const startDb = async() => {
    try {
        if (connection) {
            return;
        }
        
        if (!url) {
            throw new Error("DB_KEY is undefined");
        }
        
        connection = await mongoose.connect(url);
        return connection;
    } catch (error: any) {
        throw new Error("Error connecting to database: ", error);
    }
}

export default startDb;