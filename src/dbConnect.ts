import mongoose from "mongoose";

let isConnnected = false;
export const dbConnect = async () => {
  if (isConnnected) {
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("Connected to MongoDB");
    isConnnected = true;
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
  }
};
