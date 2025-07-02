import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { IUser, User } from "../models/user.models";
import { ApiResponse } from "../utils/ApiResponse";

const gernateAccessAndRefreshToken = async (user: IUser) => {

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const accessToken = await user.gernateAccessToken();
    const refreshToken = await user.gernateRefreshToken();

    user.accessToken = accessToken;
    user.refreshToken = refreshToken;

    await user.save();

    return { accessToken, refreshToken };
}


export const register = asyncHandler(async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        throw new ApiError(404, "Please enter name, email and password")
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new ApiError(402, "User already exists with this email")
    }

    const user = new User({
        name,
        email,
        password
    });

    await user.save();

    const { accessToken, refreshToken } = await gernateAccessAndRefreshToken(user);

    return res.status(201).cookie("accessToken", accessToken).cookie("refreshToken", refreshToken).json(new ApiResponse(201, user, "User registered successfully"));
});


export const login = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    console.log(email, password);

    if (!email || !password) {
        throw new ApiError(404, "Please enter email and password")
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(404, "Please enter a register email")
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Please enter a valid password")
    }

    const { accessToken, refreshToken } = await gernateAccessAndRefreshToken(user);

    return res.status(200).cookie("accessToken", accessToken).cookie("refreshToken", refreshToken).json(new ApiResponse(200, user, "Login successful"));
});

export const logout = asyncHandler(async (req: Request, res: Response) => {

    const user = await User.findOneAndUpdate({
        _id: req.user?._id
    }, {
        refreshToken: null,
        accessToken: null
    }, {
        new: true
    })

    if (!user) {
        throw new ApiError(404, "user not found")
    }

    return res.status(200).clearCookie("accessToken").clearCookie("refreshToken").json(new ApiResponse(200, user, "user logout successfully"))
});