import { Food } from "../models/food.model.js";



const addFood = async (req,res)=>{
    const {title, price, description,category,image} = req.body;

    if(!title || !price || !description || !category || !image){
        return res.status(400).json({msg: 'Please provide all fields'});
    }

    const foodObj = {
        title,
        price,
        description,
        category,
        image,
    }
    const responcse = await Food.create(foodObj);

    return res.status(200).json({msg:"food created successfully"})
}

const getAllFoods = async (req,res)=>{
    try {
        const foods = await Food.find({});
    
        return res.status(200).json({
            status :true,
            data : foods
        })
        
    } catch (error) {
        console.log(error)
    }
}

const getCategoryFood = async (req,res)=>{

    try {
        
        const {category} = req.params;
    
        const foods = await Food.find({category:category});
    
        // console.log(foods == true)
        if(foods.length == 0){
            return res.status(404).json({msg: 'No foods found in this category'})
        }
    
    
        return res.status(200).json({
            status :true,
            data : foods
        })
    } catch (error) {
     console.log(error)   
    }

}
const getsingleFood = async (req,res)=>{
    try {
        
        const {id} = req.params;
            
        const foods = await Food.findOne({_id:id});
    
        console.log(foods == true)
        if(foods == null){
            return res.status(404).json({msg: 'No foods found in this category'})
        }
    
    
        return res.status(200).json({
            status :true,
            data : foods
        })
    } catch (error) {
     console.log(error)   
    }

}


export {addFood,getAllFoods,getCategoryFood,getsingleFood}