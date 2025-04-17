import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connected to Mongodb database ${mongoose.connection.host}`.bgGreen.white);
  } catch (error) {
    console.error(`MongoDB ${error}`.bgRed.white);
  }
};

export default connectDB;
