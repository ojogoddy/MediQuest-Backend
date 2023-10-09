import jwt from "jsonwebtoken"

export const verifyUserToken = async (req:any, res:any, next:any) =>{
    const getSession = req.headers["cookie"]

    if(!getSession)
    {
        return res.status(404).json({
            message: "Please login to get token"
        })
    }
    const tokenCookie = await getSession.split("=")[1]
    if(tokenCookie)
    {
        const token = await tokenCookie
        jwt.verify(token, "MYsecretJAGOlabUSERform", (err:any, payload:any)=>{
            if(err)
            {
                return res.status(404).json({
                    message: "token has expired"
                })
            }
            req.user = payload
            next()
        })
    }else{
        return res.status(404).json({
            message: "Please provide a valid token"
        })
    }
}