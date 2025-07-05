import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError";
import { imageExtractor, uploadImage, backgroundChanger } from "../utils/cloudinary";
import asyncHandler from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";


export const fileResizer = asyncHandler(async (req: Request, res: Response) => {
    const {height, width, quality} = req.body;

    const files = req.files as { [key: string]: { path: string, size: number }[] };
    const localFilePath = files.file ? files.file[0].path : null;

    if(!localFilePath) {
        throw new ApiError(404, "please upload a file")
    }

    console.log("local file path", localFilePath);

    const resized_file = await uploadImage(localFilePath, width, height, quality);

    if (!resized_file) {
        throw new ApiError(500, "failed to resize image");
    }

    return res.status(200).json(new ApiResponse(200, resized_file, "file resized successfully" ));
});


export const fileExtractor = asyncHandler(async (req: Request, res: Response) => {
    const {items} = req.body;

    const files = req.files as { [key: string]: { path: string, size: number }[] };
    const localFilePath = files.file ? files.file[0].path : null;

    if(!localFilePath) {
        throw new ApiError(404, "please upload a file")
    }

    console.log("local file path", localFilePath);

    const image = await imageExtractor(localFilePath, items);

    if (!image) {
        throw new ApiError(500, "failed to extract image");
    }

    return res.status(200).json(new ApiResponse(200, image, "image extract successfully", ));
});


export const imageBackgroundChanger = asyncHandler(async (req: Request, res: Response) => {
    const {prompt} = req.body;

    const files = req.files as { [key: string]: { path: string, size: number }[] };
    const localFilePath = files.file ? files.file[0].path : null;

    if(!localFilePath) {
        throw new ApiError(404, "please upload a file")
    }

    console.log("local file path", localFilePath);

    const image = await backgroundChanger(localFilePath, prompt);

    if (!image) {
        throw new ApiError(500, "failed to change background");
    }

    return res.status(200).json(new ApiResponse(200, image, "background change successfully", ));
});