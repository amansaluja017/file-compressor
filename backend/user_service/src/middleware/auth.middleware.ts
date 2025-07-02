import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError";
import jwt from "jsonwebtoken"
import { IUser, User } from "../models/user.models";

interface DecodedToken extends jwt.JwtPayload {
    id?: string
}

declare global {
    namespace Express {
        interface Request {
            user?: IUser
        }
    }
}

export const verifyJwt = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token = req.cookies?.accessToken ?? (
            req.headers?.["authorization"] ? req.headers["authorization"].replace("Bearer ", " ") : undefined
        )

        if (!token) {
            throw new ApiError(404, "unauthorized access")
        }

        const decoded: string | jwt.JwtPayload = jwt.verify(
            token,
            process.env.SECRET!
        );

        if (!decoded || typeof decoded === "string" || !("id" in decoded)) {
            throw new ApiError(401, "unauthorized");
        }

        const user: IUser | null = await User.findOne({
            _id: (decoded as DecodedToken).id,
        });

        if (!user) {
            throw new ApiError(404, "user not found")
        }

        req.user = user;

        next();
    } catch (error) {
        console.log(error);
        throw new ApiError(401, "unauthorized")
    }
}