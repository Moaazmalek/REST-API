import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../../config";
import User from "./user.model";
import { UserServices } from "./user.services";
const JWT_SECRET = config.jwt_secret as string;
const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password, role } = req.body;

  try {
    const existingUser= await UserServices.findUserByEmail(email)
    if(existingUser){
        res.status(409).send({message:"User email is  already exists! Try using a new email address"});
        return 
    }
    const userRole=role || "user"
    const user=await UserServices.createUser(email,password,role)
     res.status(201).send({message:"User created successfully",user})
  } catch (error: any) {
    res.status(500).send({
      message: "User regestration failed!",
      error,
    });
  }
};
const loginUser=async(req:Request,res:Response):Promise<void> => {
    const {email,password}=req.body
    try {
        const user=await UserServices.findUserByEmail(email);
        if(!user ){
            res.status(400).send({message:"Invalid email or password"})
            return 
        }
        const isValidPassowrd=await UserServices.validatePassword(password,user.password)
        if(!isValidPassowrd){
            res.status(400).send({message:"Invalid password"}) 
            return;
        }
        const token= jwt.sign({email:user?.email,role:user?.role},JWT_SECRET,{expiresIn:'1h'})
        res.status(200).send({message:"User logged in successfully",token})

    }catch(error) {
        res.status(500).send({message:"User Login failed!",error})
    }

}

export const UserController = {
  registerUser,
  loginUser
};
