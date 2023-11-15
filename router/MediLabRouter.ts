import express from "express"
import { AllMediLab, LoginMediLab, MediLabLogout, RegisterMediLab, SingleMediLab } from "../controller/MediLabController"

const router = express.Router()

router.route("/register-lab").post(RegisterMediLab)
router.route("/login-lab").post(LoginMediLab)
router.route("/SingleMedi-lab/:Id").get(SingleMediLab)
router.route("/AllMedi-lab").get(AllMediLab)
router.route("/MediLogout-lab").get(MediLabLogout)

export default router