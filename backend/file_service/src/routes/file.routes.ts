import express from "express";
import { fileExtractor, fileResizer, imageBackgroundChanger } from "../controllers/file.controllers";
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

router.route("/imageExtractor").post(
    upload.fields([
        {
            name: "file",
            maxCount: 1
        }
    ]),
    fileExtractor
);

router.route("/backgroundChanger").post(
    upload.fields([
        {
            name: "file",
            maxCount: 1
        }
    ]),
    imageBackgroundChanger
);

export default router;