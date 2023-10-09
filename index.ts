import express, {Application} from "express"
import cors from "cors"
import morgan from "morgan"
import "./Database/db"
import router from "./router/jagoRouter"

const port: number = 4000
const app:Application = express()

app.use(express.json())
app.use(cors())
app.use(morgan("dev"))
app.use("/api/v1", router)

app.use("/uploads", express.static("uploads"))

const server = app.listen(port, ()=>{
    console.log("listening to port", port)
})

process.on("uncaughtException", (error:any)=>{
    console.log("stop here: uncaughtException", error)
    console.log(error)
    process.exit(1) 
})

process.on("unhandledRejection", (reason:any, promise:Promise<any>)=>{
    console.log("unhandled promise Rejection:")
    console.log("Reason",reason)
    console.log("Promise",promise)

    server.close(()=>{
        process.exit(1)
    })
})