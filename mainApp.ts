import express, {Application} from "express"
import cors from "cors"
import MediUserRoutes from "./router/MediUserRoutes"
import MediLabRoutes from "./router/MediLabRouter"
import UserProfileRoute from "./router/UserProfileRoute"
import LabProfileRoute from "./router/LabProfileRoute"

export const mainApp = (app:Application)=>{
    app.use(cors()).use(express.json())
    .use("/api/v1", MediUserRoutes)
    .use("/api/v1", MediLabRoutes)
    .use("/api/v1", UserProfileRoute)
    .use("/api/v1", LabProfileRoute)

    .get("/api", (req:any, res:any)=>{
        res.status(200).json({
            message:"api is ready"
        })
    })
}