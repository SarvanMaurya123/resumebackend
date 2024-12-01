import mongoose from "mongoose";
import DBNAME from '../Constance.js';

const connectDB = async () => {
    try {
        const connectionmongoose = process.env.MONGODBDATA + DBNAME;
        const connection = await mongoose.connect(connectionmongoose, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected...');
        console.log("MongoDB Connect For Database", connection.connection.host + ":dataBaseName:" + DBNAME);
    } catch (error) {
        console.log("MongoDB Connection failed", error);
    }
}

export default connectDB;
