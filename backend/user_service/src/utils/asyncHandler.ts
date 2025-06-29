import { Response, Request, NextFunction } from "express"


const asyncHandler = async (handler: (
    req: Request, res: Response, next: NextFunction
) => ReturnType<any> ) => {
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            handler(req, res, next)
        } catch (error) {
            
        }
    }
}

export default asyncHandler;