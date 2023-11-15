import mongoose from "mongoose"
interface user{
    fullName: string;
    email: string;
    password: string;
    profile: {}
}
interface iUser extends user, mongoose.Document{}
const userSchema = new mongoose.Schema({
    fullName:{
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
        ref: "profiles"
    }
},{timestamps:true})

export default mongoose.model<iUser>("users", userSchema)