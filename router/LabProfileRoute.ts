import express from "express"
import { editMediLabImage, editMediLabProfile } from "../controller/LabProfileController"



const router = express.Router()

router.route("/editMediProfile-lab/proId").put(editMediLabProfile)
router.route("/editMediImage-lab/proId").put(editMediLabImage)


export default router