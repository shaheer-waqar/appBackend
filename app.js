import "dotenv/config"
import express from 'express'; 
import userRouter from './routes/user.route.js'
import dbConnection from "./config/db.connection.js";
import cors from "cors"

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.use);

dbConnection()
const PORT = process.env.PORT || 3000;


app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use("/api/user/",userRouter);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});