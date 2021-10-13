import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectToDb = () => {
    const mongodbUrl = process.env.MONGODB_URI;
    mongoose.connect(mongodbUrl);

    const db = mongoose.connection;

    db.once('open', () => {
        // tslint:disable-next-line:no-console
        console.log("Connected successfully to MongoDB")
    });
    return db;
}

export default connectToDb;