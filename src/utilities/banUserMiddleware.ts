import type { Request, Response, NextFunction } from "express";
import { checkIfUserIsBannedRepository } from "../admin/admin.repositories.js";

export async function checkBanUser(req: Request, res: Response, next: NextFunction){
    try{
        const userid = req.auth?.userId!;
        const check = await checkIfUserIsBannedRepository(userid);
        if(check.length > 0){
            console.log("not allowed banned");
            res.status(403).json({
              success: false,
              banned: true
            });
        }else{
            console.log("allowed not banned");
            next();
        }
    }catch(err){
        next(err);
    }
}