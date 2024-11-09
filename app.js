import "dotenv/config"
import express from 'express'; 
import dbConnection from "./config/db.connection.js";
import cors from "cors"
import userRouter from './routes/user.route.js'
import foodRouter from './routes/food.route.js'
import orderRouter from './routes/order.route.js'
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

dbConnection()
const PORT = process.env.PORT || 3000;


app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use("/api/user/",userRouter);
app.use("/api/food/",foodRouter)
app.use("/api/",orderRouter)


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});