import { generateToken } from "../lib/utils.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs"


export const signup = async (req,res) => {
    const {fullName , email , password} = req.body;
    console.log(req.body)
    try{
        if(!fullName || !email || !password){
            return res.status(400).json({message:"Please fill all the fields"})
        }
        if(password.length < 6){
            return res.status(400).json({message:"Password should be at least 6 characters"})
        }
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email address" });
        }

        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({message:"Email already exists"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new User({
            fullName,
            email,
            password : hashedPassword
        })

        if (newUser){
            generateToken(newUser._id, res)
            await newUser.save();

            res.status(200).json({
                id : newUser._id,
                fullName : newUser.fullName,
                email : newUser.email,
                profilePic : newUser.profilePic
            })
        }
        else{
            res.status(500).json({message:"Something went wrong"})
        }
    }catch(error){
        console.log("Error in signup controller", error);
        res.status(500).json({message:"internal server error"})
    }   
}