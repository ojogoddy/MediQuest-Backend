import {Application, Request, Response, NextFunction, application} from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import MediLabModel from "../model/MediLabModel"
import LabProfileModel from "../model/LabProfileModel"

export const RegisterMediLab = async (req: Request, res:Response)=>{
    try{
        const{labName, email, password}= req.body
        if(!labName || !email || !password) {
            return res.status(500).json({
                message: "all field is required"
            })
        }
        const checkEmail = await MediLabModel.findOne({email:email})
        if(checkEmail){
            return res.status(500).json({
                message: "email already exist"
            })
        }
        const salt = await bcrypt.genSalt(10)
        const hashpassword = await bcrypt.hash(password, salt)

        const RegMediLab = await MediLabModel.create({
            labName, email, password:hashpassword
        })
        const createMedilab:any = await LabProfileModel.create({
            _id:RegMediLab._id,
             
            firstName: "",
            lastName: "",
            gender: "",
            address:"",
            phoneNumber: "" ,

        })
        RegMediLab.profile= createMedilab._id
        RegMediLab.save()
        return res.status(201).json({
            message: "MediQuest user registered successfully",
            data: RegMediLab,
            profile: createMedilab
        })
    }catch(error:any)
    {
        return error
    }
}

export const LoginMediLab = async(req: Request, res:Response)=>{
    try{
        const {email, password} = req.body
        if(!email || !password)
        {
            return res.status(401).json({
                message: "all field required"
            })
        }
        const checkEmail:any = await MediLabModel. findOne({email:email})
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
                return res.status(200).json({
                    message: "login successfull",
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

export const SingleMediLab = async (req:Request, res:Response) =>{
    try{
        const getSingleLab =  await MediLabModel.findById(req.params.Id).populate({
            path: "Labprofiles",
            select: "firstName lastName gender email address religion"
            }
        );
        return res.status(201).json({
            message: "successfully",
            data: getSingleLab
        })
    }catch(error:any)
    {
        return error
    }
}
export const AllMediLab = async (req:Request, res:Response) =>{
    try{
        const getAllLab =  await MediLabModel.find().populate({
            path: "Labprofiles",
            select: "firstName lastName gender email:email address religion "
            }
        );
        return res.status(201).json({
            message: "successfully",
            data: getAllLab
        })
    }catch(error:any)
    {
        return error
    }
}
export const MediLabLogout = async (req:Request, res:Response)=>{
        try{
            res.clearCookie("sessionid")
            return res.status(200).json({
                message: " Medilab Logout succesful"
            })
        }catch(error:any)
        {
            return res.status(404).json({
                message:error.message
            })
        }
    }