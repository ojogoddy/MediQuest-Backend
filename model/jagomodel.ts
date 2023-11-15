// import mongoose from "mongoose";

// interface jagoUserAuth {
//     fullName: string,
//     email: string,
//     password: string,
//     gender: string
// }
// interface ijagoUserAuth extends jagoUserAuth, mongoose.Document{}

// const jagoUserAuthSchema = new mongoose.Schema(
//     {
//         fullName:{
//             type:String,
//         },
//         email:{
//             type: String,
//         },
//         password:{
//             type:String,
//         },
//         gender :{
//             type:String,
//         }

//     },
//     {timestamps:true}
// )
// export default mongoose.model<ijagoUserAuth>("JagoUserAuth", jagoUserAuthSchema)