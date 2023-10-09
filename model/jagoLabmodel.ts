import mongoose from "mongoose";
interface test{
    testName:string
}
interface jagoLabAuth {
    labName: string,
    email: string,
    password: string,
    phoneNumber:number,
    address: string,
    tests: test[]
    profileImage:string
}
interface ijagoLabAuth extends jagoLabAuth, mongoose.Document{}
const testSchema = new mongoose.Schema(
    {
        testName:{
            type: String
        }
    },
    {_id:false}
)

const jagoLabAuthSchema = new mongoose.Schema(
    {
        labName:{
            type:String,
        },
        email:{
            type: String,
        },
        password:{
            type:String,
        },
        phoneNumber :{
            type:Number,
        },
        address :{
            type:String,
        },
        tests :[testSchema],
        profileImage :{
            type:String
        },

    },
    {timestamps:true}
)
export default mongoose.model<ijagoLabAuth>("JagoLabAuth", jagoLabAuthSchema)