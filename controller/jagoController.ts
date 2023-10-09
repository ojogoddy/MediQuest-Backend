import jagomodel from "../model/jagomodel";
import express, {Request, Response} from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const RegisterJagoUser = async (req:Request, res:Response):Promise<Response> =>{
    try{
        const {fullName, email, password, gender} = req.body
        if(!fullName || !email || !password || !gender){
            return res.status(404).json({
                message: "Please fill in all required field"
            })
        }
const checkEmail = await jagomodel.findOne({email:email})
console.log("email", checkEmail)
if(checkEmail){
    return res.status(404).json({
        message: "Inputted email already in database"
    })
}
const salt = await bcrypt.genSalt(12)
const encryptedPassword = await bcrypt.hash(password, salt)
const jagoUser:any = await jagomodel.create ({
    fullName,
    email,
    password: encryptedPassword,
    gender,
})
return res.status(201).json({
    message: "Registration completed successfully",
    success: 1,
    data: jagoUser
})

    }
    catch(error:any)
    {
        return res.status(404).json({
            message: error.message
        })
    }
}

export const jagoUserLogin = async (req:Request, res:Response):Promise<Response> =>{
    try{
        const {email, password} =req.body
        if(!email || !password)
        {
            return res.status(401).json({
                message:"Please input all field"
            })
        }
        const checkEmail:any = await jagomodel.findOne({email:email})
        console.log(checkEmail)
        if(checkEmail)
        {
            const checkPassword = await bcrypt.compare(password, checkEmail.password)
            if(checkPassword)
            {
                const token = jwt.sign(
                    {_id: checkEmail._id, fullName:checkEmail.fullName},
                    "MYsecretJAGOlabUSERform",
                    {expiresIn: "10m"}
                )
                console.log(token)
                
                const {password, ...info} = checkEmail._doc
                const option:any = {expiresIn:"10m"}
                res.cookie("sessionid", token, option )
                return res.status(200).json({
                    message:"log in successfull",
                    result: {info, token}
                })
            }else{
                return res.status(401).json({
                    message:"Password not correct"
                })
            }
        }else{
            return res.status(201).json({
                message:'user not found'
            })
        }
    }catch(error:any)
    {
        return res.status(404).json({
            message: error.message
        })
    }
}

export const AllJagoUser = async (req:Request, res:Response):Promise<Response>=>{
    try{
        const data =  await jagomodel.find()
        return res.status(200).json({
            message:"All jagoUser successfully retrieved",
            data: data
        })
    }catch(error:any)
    {
        return res.status(404).json({
            message:error.message
        })
    }
}

export const updateJagoUser = async (req:Request, res:Response):Promise<Response>=>{
    try{
        const updateData = await jagomodel.findByIdAndUpdate(req.params.id, req.body, {new:true});
        return res.status(200).json({
            message: "user updated successfully"
        })
    }catch(error:any)
    {
        return res.status(500).json({
            message:error.message
        })
    }
}

export const deleteJagoUser = async (req:Request, res:Response):Promise<Response>=>{
    try{
        const {id} = req.params
        const deletedUser = await jagomodel.findByIdAndDelete(id)

        if (!deletedUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        return  res.status(200).json({
            message: "user deleted successfully"
        })
    }catch(error:any)
    {
        return res.status(404).json({
            message: error.messsage
        })
    }
}

export const UserLogout = async (req:Request, res:Response):Promise<Response> =>{
    try{
        res.clearCookie("sessionId")
        return res.status(200).json({
            message: "User Logout succesful"
        })
    }catch(error:any)
    {
        return res.status(500).json({
            message:error.message
        })
    }
}