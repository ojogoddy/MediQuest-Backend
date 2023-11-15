import multer from "multer"
import express, {Request} from "express"
import path from "path"

type callbackDestination = ( err:Error | null, destination:string  )=>void
type filenameDestination = ( err:Error | null, filename:string  )=>void
const storage = multer.diskStorage({
    destination: function(req:Request, file:any, cb:any){
        cb(null, path.join(__dirname, "../uploads") )
    },
    filename: function(req:Request, file:any, cb:any){
        const UniqueSuffix = Date.now() + "-" + Math.round(Math.random()
        * 1e9 )
        cb(null, file.fieldname + "_" + UniqueSuffix + path.extname(file.originalname))
    }
})

export const upload = multer ({storage:storage}).single("userImage")

export default upload