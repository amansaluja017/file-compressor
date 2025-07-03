import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError";
import { uploadImage } from "../utils/cloudinary";
import asyncHandler from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";


export const fileResizer = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

    const files = req.files as { [key: string]: { path: string, size: number }[] };
    const localFilePath = files.file ? files.file[0].path : null;

    if(!localFilePath) {
        throw new ApiError(404, "please upload a file")
    }

    const size = files.file ? files.file[0].size : null;

    console.log("local file path", localFilePath);

    const resized_file = await uploadImage(localFilePath);
    console.log(resized_file)

    if (!resized_file) {
        throw new ApiError(500, "failed to resize image");
    }

    return res.status(200).json(new ApiResponse(200, resized_file, "file resized successfully", ));
});