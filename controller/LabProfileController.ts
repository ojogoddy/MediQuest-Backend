import {Application, Request, Response, NextFunction, application} from "express"
import cloudinary from "../utils/Cloudinary"
import MediLabModel from "../model/MediLabModel"

export const editMediLabProfile = async(req:Request, res:Response)=>{
    try{
        const {FullName, location, email, phoneNumber, website} = req.body
        const {proId} = req.params
        
        const MediLabUpdate = await MediLabModel.findByIdAndUpdate(
            proId,
            {
                FullName, location, phoneNumber, website, email
            },
            {
                new: true
            }
        )
        return res.status(201).json({
            message: "MediLab profile updated successfully",
            data: MediLabUpdate
        })
    }catch(error:any)
    {
        return error
    }
}

export const editMediLabImage = async (req:any, res:Response)=>{
    try{
        const {proId} =req.params
        console.log(req.file)
        const labImageUrl = await cloudinary.uploader.upload(req.file.path)
        console.log("userpicture", labImageUrl)
        const updateMediLabimage = await MediLabModel.findByIdAndUpdate(
            proId,
            {
                labImage:labImageUrl.secure_url
            },
            {
                new:true
            }
        )
        return res.status(201).json({
            message: "MediUser Image successfully updated",
            data: updateMediLabimage
        })
    }catch(error:any)
    {
        return error
    }
}