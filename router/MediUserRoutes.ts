import express from "express"
import { RegisterMediUser, LoginMediUser, SingleMediUser, AllMediUser, MediUserLogout } from "../controller/MediUserController"
import { verifyUserToken } from "../middleWare/verifyUserToken"

const router = express.Router()

router.route("/register-user").post(RegisterMediUser)
router.route("/login-user").post(LoginMediUser)
router.route("/SingleMedi-user/:Id").get(SingleMediUser)
router.route("/AllMedi-user").get( AllMediUser)
router.route("/MediLogout-user").get(MediUserLogout)

export default router