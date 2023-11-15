import express from "express"
import { editMediUserImage, editMediUserProfile } from "../controller/UserProfileController"
import {upload} from "../middleWare/multer"


const router = express.Router()

router.route("/editMediProfile-user/:proId").put(editMediUserProfile)
router.route("/editMediImage-user/:proId").put(upload, editMediUserImage)


export default router