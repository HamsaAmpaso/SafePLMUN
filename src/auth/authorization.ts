import type { Request, Response, NextFunction } from "express";
export  function authorize(...roles: string[]){
    return (req: Request, res: Response, next: NextFunction) =>{
          if (!req.auth || !roles.includes(req.auth.role)) {
            return res.status(403).json({
                success: false,
                message: "You are unauthorized to do this method!",
            });
        }
        next();
    }
}