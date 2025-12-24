import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/ticketboss");
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("DB Connection Failed", err);
    process.exit(1);
  }
}
