import express from 'express';
import { changePassword, loginUser, reigisterUser } from '../controller/user.controller.js';
import { verifyUser } from '../middleware/verifyUser.js';
import { Order } from '../models/order.model.js';


const router = express.Router();


router.post("/order",verifyUser, async (req,res)=>{
    const {title,price,quantity} = req.body;

    if(!title || !price || !quantity){
       return res.status(404).json({msg:"all fields missing"})
    }

    const response = await Order.create(
        {
        title,
        price: Number(quantity * price),
        quantity,
        orderby:req.user.id
        }
    )

    return res.status(200).json({msg:"order placed successfully"})
})

router.get("/getorder",verifyUser, async (req,res)=>{


    const response = await Order.find({orderby:req.user.id})

    console.log(req.user.id)
    return res.status(200).json({data:response})
})

export default router