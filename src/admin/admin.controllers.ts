import type { Request, Response, NextFunction } from "express";
import { setReportAsFalseAlarmService } from "./admin.services.js";
import { seeAllUsersService } from "./admin.services.js";
import { banUserService } from "./admin.services.js";
import { unbanUserService } from "./admin.services.js";
import { seeAllUsersStatusService } from "./admin.services.js";
import { adminDashboardService } from "./admin.services.js";
export async function setReportAsFalseAlarmController(req: Request, res: Response, next: NextFunction){
    try{
        const report_id = req.body.report_id;
        await setReportAsFalseAlarmService(report_id);
        res.status(200).json({
            success: true
        });
    }catch(err){
        next(err);
    }
}
export async function seeAllUsersController(req: Request, res: Response, next: NextFunction){
    try{
        const data = await seeAllUsersService();
        res.status(200).json({
            success: true,
            data: data
        });
    }catch(err){
        next(err);
    }
}
export async function banUserController(req: Request, res: Response, next: NextFunction){
    try{
        const userid = req.body.userid;
        await banUserService(userid);
        res.status(201).json({
            success: true
        });
    }catch(err){
        next(err);
    }
}
export async function unbanUserController(req: Request, res: Response, next: NextFunction){
    try{
        const userid = req.body.userid;
        await unbanUserService(userid);
        res.status(201).json({
            success: true
        });
    }catch(err){
        next(err);
    }
}
export async function seeAllUsersStatusController(req: Request, res: Response, next: NextFunction){
    try{
       const data = await seeAllUsersStatusService();
       res.status(200).json({
        success: true,
        data: data
       });
    }catch(err){
       next(err);
    }
}
export async function adminDashboardController(req: Request, res: Response, next: NextFunction){
    try{
        const data = await adminDashboardService();
        res.status(200).json({
            success: true,
            data: data
        });
    }catch(err){
        next(err);
    }
}