import express from 'express';
import { addFood, getAllFoods, getCategoryFood } from '../controller/food.controller.js';
import { verifyUser } from '../middleware/verifyUser.js';


const  router = express.Router();

router.post('/addFood',verifyUser,addFood);
router.get('/getFood',verifyUser,getAllFoods);
router.get('/getFood/:category',verifyUser,getCategoryFood);

router.get("/",(req, res) =>{
    res.send("Hello, World!");
}
)
export default router