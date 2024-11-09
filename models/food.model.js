import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true,
    },
    category:{
        type: String,
        required: true,
    }
})

export const Food = mongoose.model("food", foodSchema);

