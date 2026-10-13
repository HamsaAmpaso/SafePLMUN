import type { Request, Response, NextFunction } from "express";
export function asyncControllerHandler(controller: (req: Request, res: Response, next: NextFunction) => Promise<void>){
       return async (req: Request, res: Response, next: NextFunction)=>{
         try{
            await controller(req, res, next);
         }catch(err){
            next(err);
         }
        
       }
    
}