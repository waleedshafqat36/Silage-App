import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("MONGO_URI is missing in environment variables.");
}

export const connectDB = async () => {
  try {
    if (mongoose.connection.readyState !== 0) {
      console.log("MongoDB already connected");
      return;
    }

    await mongoose.connect(MONGO_URI, {
      dbName: "bloggingDB",
    });

    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB Connection Failed:", error);
  }
};
