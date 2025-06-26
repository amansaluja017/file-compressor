import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { User } from "../models/user.models";



export const login = asyncHandler(async (req: Request, res: Response) => {
    const {email, password} = req.body;

    if(!email || !password) {
        throw new ApiError(404, "Please enter email and password")
    }

    const user = User.findOne({email});

    if(!user) {
        throw new ApiError(404, "Please enter a register email")
    }
})