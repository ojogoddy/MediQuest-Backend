import express, {Application} from "express"
import "./Database/db"
import { mainApp } from "./mainApp"

const port:number = 4500
const app:Application = express()
mainApp(app)



app.use("/uploads", express.static("uploads"))

const server = app.listen(port, ()=>{
    console.log("listening to port", port)
})

process.on("uncaughtException", (error:any)=>{
    console.log("stop here: uncaughtException")
    console.log(error)
    process.exit(1) 
})

process.on("unhandledRejection", (reason:any, promise:Promise<any>)=>{
    console.log("stop here: unhandledRejection")
    console.log("Reason",reason)
    server.close(()=>{
        process.exit(1)
    })
})