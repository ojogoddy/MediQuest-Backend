import {Application, Request, Response, NextFunction, application} from "express"
import cloudinary from "../utils/Cloudinary"
import MediUserModel from "../model/MediUserModel"

export const editMediUserProfile = async(req:Request, res:Response)=>{
    try{
        const {firstName, lastName, gender, address, email, religion} = req.body
        const {proId} = req.params
        const fullName= `${firstName} ${lastName}`

        const updateObject={
            firstName, lastName, fullName, gender, email, address, religion
        }
        const MediUserUpdate = await MediUserModel.findByIdAndUpdate(
            proId,
            updateObject,
            {
                new: true
            }
        )
        return res.status(201).json({
            message: "MediUser profile updated successfully",
            data: updateObject
        })
    }catch(error:any)
    {
        return error.message
    }
}

export const editMediUserImage = async (req:any, res:Response)=>{
    try{
        const {proId} =req.params
        console.log(req.file)
        const userImageUrl = await cloudinary.uploader.upload(req.file.path)
        console.log("userpicture", userImageUrl)
        const updateMediUserimage = await MediUserModel.findByIdAndUpdate(
            proId,
            {
                userImage:userImageUrl.secure_url
            },
            {
                new:true
            }
        )
        return res.status(201).json({
            message: "MediUser Image successfully updated",
            data: updateMediUserimage
        })
    }catch(error:any)
    {
        return error
    }
}