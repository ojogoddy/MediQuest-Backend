import {Application, Request, Response, NextFunction, application} from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import MediUserModel from "../model/MediUserModel"
import UserProfileModel from "../model/UserProfileModel"

export const RegisterMediUser = async (req: Request, res:Response)=>{
    try{
        const{fullName, email, password}= req.body
        if(!fullName || !email || !password) {
            return res.status(500).json({
                message: "all field is required"
            })
        }
        const checkEmail = await MediUserModel.findOne({email:email})
        if(checkEmail){
            return res.status(500).json({
                message: "email already exist"
            })
        }
        const salt = await bcrypt.genSalt(10)
        const hashpassword = await bcrypt.hash(password, salt)

        const RegMediUser = await MediUserModel.create({
            fullName, email, password:hashpassword
        })
        const createMediUser:any = await UserProfileModel.create({
            _id:RegMediUser._id,
            firstName: "",
            lastName: "",
            gender: "",
            email:email,
            address: "",
            religion: ""
            
        })
        RegMediUser.profile= createMediUser._id
        RegMediUser.save()
        return res.status(201).json({
            message: "MediQuest user registered successfully",
            data: RegMediUser,
            profile: createMediUser
        })
    }catch(error:any)
    {
        return error
    }
}

export const LoginMediUser = async(req: Request, res:Response)=>{
    try{
        const {email, password} = req.body
        if(!email || !password)
        {
            return res.status(401).json({
                message: "all field required"
            })
        }
        const checkEmail:any = await MediUserModel. findOne({email:email})
        if(checkEmail)
        {
            const checkPassword = await bcrypt.compare(password, checkEmail.password)
            if(checkPassword)
            {
                const token = jwt.sign(
                    {_id:checkEmail._id, userName:checkEmail.userName},
                    "ThisIsMySECRETkeyForME",
                    {expiresIn: "10m"}
                )
                console.log(token)

                const {password, ...info} = checkEmail._doc
                const option:any = {expiresIn: "10m"}
                res.cookie("sessionid", token, option)
                
                return res.status(201).json({
                    message: "MediUser login successfull",
                    result: {info, token}
                })
            }else{
                return res.status(401).json({
                    message: "incorrect password"
                })
            }
        }else{
            return res.status(404).json({
                message: "user not found"
            })
        }
    }catch(error:any)
    {
        return error
    }
}
export const SingleMediUser = async (req:Request, res:Response) =>{
    try{
        const getSingle =  await MediUserModel.findById(req.params.Id).populate({
            path: "profile",
            select: "firstName lastName gender email address religion"
            }
        );
        return res.status(201).json({
            message: "successfully",
            data: getSingle
        })
    }catch(error:any)
    {
        return error
    }
}
export const AllMediUser = async (req:Request, res:Response) =>{
    try{
        const getAll =  await MediUserModel.find().populate({
            path: "profile",
            select: "firstName lastName gender email:email address religion "
            }
        );
        return res.status(201).json({
            message: "successfully",
            data: getAll
        })
    }catch(error:any)
    {
        return error
    }
}
export const MediUserLogout = async (req:Request, res:Response)=>{
        try{
            res.clearCookie("sessionId")
            console.log("sessionid")
            return res.status(200).json({
                message: " MediUser Logout succesful"
            })
        }catch(error:any)
        {
            return res.status(404).json({
                message:error.message
            })
        }
    }