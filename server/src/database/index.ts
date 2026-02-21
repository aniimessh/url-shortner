import mongoose from "mongoose";

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("Connected to Database");
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error connecting to database: ", error.message);
    }
  }
};
