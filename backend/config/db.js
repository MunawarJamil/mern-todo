import mongoose from "mongoose";
export const db_connection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("database connected successfully");
  } catch (error) {
    console.log("error while connecting with database", error);
    process.exit(1); // 1 mean failure 0 mean success
  }
};
