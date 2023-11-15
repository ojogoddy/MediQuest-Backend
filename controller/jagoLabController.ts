// import jagoLabmodel from "../model/jagoLabmodel";
// import express, {Request, Response} from "express"
// import bcrypt from "bcrypt"
// import jwt from "jsonwebtoken"

// export const RegisterJagoLab = async (req:Request, res:Response):Promise<Response> =>{
//     try{
//         const {labName, email, password, phoneNumber, address, tests} = req.body
//         if(!labName || !email || !password || !phoneNumber || !address || !tests ){
//             return res.status(404).json({
//                 message: "Please fill in all required field"
//             })
//         }
// const checkEmail = await jagoLabmodel.findOne({email:email})
// console.log("email", checkEmail)
// if(checkEmail){
//     return res.status(401).json({
//         message: "Inputted email already in database"
//     })
// }
// const salt = await bcrypt.genSalt(12)
// const encryptedPassword = await bcrypt.hash(password, salt)

// const jagoLab = await jagoLabmodel.create ({
//     labName,
//     email,
//     password: encryptedPassword,
//     phoneNumber,
//     address,
//     tests,
//     profileImage:req.file.filename
// })
// return res.status(201).json({
//     message: "Registration completed successfully",
//     success: 1,
//     data: jagoLab
// })
//     }
//     catch(error:any)
//     {
//         return res.status(404).json({
//             message: error.message
//         })
//     }
// }

// export const jagoLabLogin = async (req:Request, res:Response):Promise<Response> =>{
//     try{
//         const {email, password} =req.body
//         if(!email || !password)
//         {
//             return res.status(401).json({
//                 message:"Please input all field"
//             })
//         }
//         const checkEmail:any = await jagoLabmodel.findOne({email:email})
//         console.log(checkEmail)
//         if(checkEmail)
//         {
//             const checkPassword = await bcrypt.compare(password, checkEmail.password)
//             if(checkPassword)
//             {
//                 const token = jwt.sign(
//                     {_id: checkEmail._id, labName:checkEmail.labName},
//                     "MYsecretJAGOlabUSERform",
//                     {expiresIn: "10m"}
//                 )
//                 console.log(token)
                
//                 const {password, ...info} = checkEmail._doc
//                 const option:any = {expiresIn:"10m"}
//                 res.cookie("sessionid", token, option )
//                 return res.status(200).json({
//                     message:"log in successfull",
//                     result: {info, token}
//                 })
//             }else{
//                 return res.status(401).json({
//                     message:"Password not correct"
//                 })
//             }
//         }else{
//             return res.status(201).json({
//                 message:'user not found'
//             })
//         }
//     }catch(error:any)
//     {
//         return res.status(404).json({
//             message: error.message
//         })
//     }
// }

// export const AllJagoLab = async (req:Request, res:Response):Promise<Response>=>{
//     try{
//         const data =  await jagoLabmodel.find()
//         return res.status(200).json({
//             message:"All jagoLab successfully retrieved",
//             data: data
//         })
//     }catch(error:any)
//     {
//         return res.status(404).json({
//             message:error.message
//         })
//     }
// }
// export const UpdateLabJago = async (req:Request, res:Response):Promise<Response>=>{
//     try{
//         const updateLabData = await jagoLabmodel.findByIdAndUpdate(req.params.id, req.body, {new:true})
//         return res.status(200).json({
//             message: "Lab updated successfully"
//         })
//     }catch(error:any)
//     {
//         return res.status(500).json({
//             message:error.message
//         })
//     }
// }

// export const deleteLabJago = async (req:Request, res:Response):Promise<Response>=>{
//     try{
//         const labId=await jagoLabmodel.findByIdAndDelete(req.params.id);
//         return res.status(200).json({
//             message:" Lab deleted successfully"
//         })


//     }catch(error:any)
//     {
//         return res.status(500).json({
//             message:error.message
//         })
//     }
// }

// export const LabLogout = async (req:Request, res:Response):Promise<Response> =>{
//     try{
//         res.clearCookie("sessionId")
//         return res.status(201).json({
//             message: "Lab Logout succesful"
//         })
//     }catch(error:any)
//     {
//         return res.status(404).json({
//             message:error.message
//         })
//     }
// }