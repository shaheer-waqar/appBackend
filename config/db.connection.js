import mongoose from "mongoose";

const dbConnection = ()=>{
  mongoose.connect(process.env.MONGODB_URI)
  .then((res)=>
    console.log("Connected to MongoDB"))
  .catch((err)=>
    console.log("Failed to connect to MongoDB", err))
}

export default dbConnection;