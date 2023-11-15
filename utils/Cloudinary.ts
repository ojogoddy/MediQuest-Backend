import cloud, {v2} from "cloudinary"

const cloudinary: typeof v2 = cloud.v2

cloudinary.config({
    cloud_name: "dfbmcsblf",
    api_key: "593428591584263",
    api_secret: "yUII2TxctT4h9fhs43tNECe3bvE"
})

export default cloudinary