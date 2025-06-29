import { NextFunction, Request, Response } from "express";

export const asyncHandler = async (handler: (
    req: Request, 
    res: Response,
    next: NextFunction
) => ReturnType<any> ) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
        await handler(req, res, next);
        } catch (error) {
        next(error);
        }
    };
}