import mongoose from "mongoose"
interface user{
    labName: string;
    email: string;
    password: string;
    profile: {}
}
interface iUser extends user, mongoose.Document{}
const userSchema = new mongoose.Schema({
    labName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    profile:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Labprofiles"
    }
},{timestamps:true})

export default mongoose.model<iUser>("Labusers", userSchema)