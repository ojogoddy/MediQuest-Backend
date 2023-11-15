import mongoose from "mongoose"

interface user{
    labName: string;
    email: string;
    location: string;
    phoneNumber: string;
    website: string;
    labImage: string;
    certifications: string
}
interface iUser extends user, mongoose.Document{}

const profileSchema = new mongoose.Schema({
    labName: {
        type:String
    },
    email: {
        type:String
    },
    location: {
        type:String
    },
    phoneNumber: {
        type:String
    },
    website: {
        type:String
    },
    certifications: {
        type:String
    },
    labImage: {
        type:String
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Labuser"
    }
})

export default mongoose.model<iUser>("Labprofiles", profileSchema)