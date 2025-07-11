import { TUser } from "./user.interface"
import User from "./user.model"
import bcrypt from 'bcrypt'

const findUserByEmail=async(email:string) => {
    return User.findOne({email:email})

}
const createUser=async(email:string,password:string,role:string): Promise<TUser | null>=> {
 const hashedPassword=await bcrypt.hash(password,10)
 const user=await new User({email,password:hashedPassword,role})
 return await user.save()
}
const validatePassword=async(inputPassword:string,userPassword:string) => {
return  bcrypt.compare(inputPassword,userPassword)
}
export const UserServices={
    findUserByEmail,
    createUser,
    validatePassword
}