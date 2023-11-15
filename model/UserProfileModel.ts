import mongoose from "mongoose"

interface user{
    firstName: string;
    lastName: string;
    gender: string;
    email: string;
    address: string;
    religion: string;
    userImage: string
}
interface iUser extends user, mongoose.Document{}

const profileSchema = new mongoose.Schema({
    firstName: {
        type:String
    },
    lastName: {
        type:String
    },
    gender: {
        type:String
    },
    address: {
        type:String
    },
    religion: {
        type:String
    },
    email: {
        type:String
    },
    userImage: {
        type:String
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }
})

export default mongoose.model<iUser>("profiles", profileSchema)