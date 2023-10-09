import mongoose from "mongoose";

const url:string = "mongodb://0.0.0.0:27017/JagoUserAuth"

mongoose.connect(url).then(()=>{
    console.log("Connected to MongoDB")
}).catch((error:any)=>{
    console.log(`Error connecting to mongodb ${error}`)
})
export default mongoose