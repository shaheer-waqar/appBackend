import { User } from "../models/user.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


// register user
const reigisterUser = async (req,res ) =>{
    try {
        const { username, email, password } = req.body;
        if(!username || !email || !password){
            return res.status(400).json({ msg: 'Please provide all fields' });
        }

        const user = User.findOne({email: email,});
        if(!user){
            return res.status(400).json({ msg: 'User already exists' });
        }

        const hashpassword = await bcrypt.hash(password,10);

        const userObj = {
            username,
            email,
            password: hashpassword,
        }

        const response = await User.create(userObj)

        res.status(201).json({msg: 'User registered successfully', user: response});
        
    } catch (error) {
        console.log(error);
    }

}

// login user

const loginUser  = async (req,res) =>{
    try {
        const { email, password } = req.body;
        if(!email || !password){
            return res.status(400).json({ error: 'Please provide all fields' });
        }
        const user = await User.findOne({email: email,});

        if(user == null){
            return res.status(400).json({ msg: 'Incorrect email or password' });

        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({ msg: 'Incorrect email or password' });
        }

        const token = jwt.sign({
            id: user._id,
            username: user.username,
            email: user.email
        },
        process.env.JWT_SECRET_KEY    
    )

    
        res.status(200).json({
            msg: 'User logged in successfully',
            token
        })

        
    } catch (error) {
        console.log(error);
    }
}

// change password

const changePassword = async (req,res) =>{
    const {oldpassword,newpassword} = req.body;

    // return console.log(req.user.id)
    
    if(!oldpassword || !newpassword){
        return res.status(400).json({ error: 'Please provide all fields' });
    }
    
    const user = await User.findOne({_id:req.user.id})

    if(user == null){
        return res.status(400).json({ msg: 'User not found' });
    }

    const isMatch = await bcrypt.compare(oldpassword, user.password);

    if(!isMatch){
        return res.status(400).json({ msg: 'Incorrect old password' });
    }

    const hashpassword = await bcrypt.hash(newpassword, 10)
    user.password = hashpassword;
    await user.save();

    res.status(201).json({message: 'password changed successfully'});
} 

export {reigisterUser,loginUser,changePassword}