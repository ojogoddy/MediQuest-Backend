import jwt from "jsonwebtoken"

export const tokenGenerator = (data:any)=>{
    return jwt.sign(data, "MYsecretJAGOlabUSERform", {expiresIn: "10m"})
}