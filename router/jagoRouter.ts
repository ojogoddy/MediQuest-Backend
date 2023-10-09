import express, {Router} from "express"
import jwt from "jsonwebtoken"
import { AllJagoUser, RegisterJagoUser, UserLogout, jagoUserLogin } from "../controller/jagoController"
import { AllJagoLab, LabLogout, RegisterJagoLab, jagoLabLogin } from "../controller/jagoLabController"
import { upload } from "../middleWare/multer"
import { verifyUserToken } from "../middleWare/verifyUserToken"


const router = express.Router()

router.route("/register-jago-user").post(RegisterJagoUser)
router.route("/login-user").post(jagoUserLogin)
router.route("/getAll-user").get(verifyUserToken, AllJagoUser)
router.route("/logout-jagoUser").post(UserLogout)


router.route("/register-jago-lab").post(upload, RegisterJagoLab)
router.route("/login-lab").post(jagoLabLogin)
router.route("/getAll-user").get(verifyUserToken, AllJagoLab)
router.route("/logout-jagoLab").post(LabLogout)

export default router