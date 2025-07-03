import express from "express";
import { fileResizer } from "../controllers/file.controllers";
import { upload } from "../middleware/multer";

const router = express.Router();

router.route("/imageResize").post(
    upload.fields([
        {
            name: "file",
            maxCount: 1
        }
    ]),
    fileResizer
);

export default router;