import type { Request, Response, NextFunction } from "express";
import { getAllMedicRequestsService } from "./clinic.side.services.js";
import { resolveRequestService } from "./clinic.side.services.js";
import { clinicDashboardService } from "./clinic.side.services.js";
export async function getAllMedicRequestClinicSideController(req: Request, res: Response, next: NextFunction){
    try{
        const data = await getAllMedicRequestsService();
        res.status(200).json({
            success: true,
            data: data
        });
    }catch(err){
        next(err);
    }
}
export async function resolveRequestController(req: Request, res: Response, next: NextFunction){
    try{
        const requestId = req.body.requestId;
        const userId = req.body.userId;
        const selfId = req.auth?.userId!;
        await resolveRequestService(requestId, userId, selfId);
        res.status(201).json({
            success: true
        });
    }catch(err){
        next(err);
    }
}
export async function clinicDashboardController(req: Request, res: Response, next: NextFunction){
    try{
        const data = await clinicDashboardService();
        res.status(200).json({
            success: true,
            data: data
        });
    }catch(err){
        next(err);
    }
}
