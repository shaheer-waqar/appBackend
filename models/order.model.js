import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true
    },
    orderby:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
})

export const Order = mongoose.model("Order", orderSchema);

