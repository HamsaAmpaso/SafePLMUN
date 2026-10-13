import type { Request, Response, NextFunction } from "express";
import { reportAnIncidentService } from "./user.services.js";
import { getReportsService } from "./user.services.js";
import { markAsSafeService } from "./user.services.js";
import { getStatusService } from "./user.services.js";
import { markAsNeedHelpService } from "./user.services.js";
import { markAsRescuedService } from "./user.services.js";
import { getProfileService } from "./user.services.js";
import { finishAccountSignupService } from "./user.services.js";
import { searchUserService } from "./user.services.js";
import { setUserAsBuddyService } from "./user.services.js";
import { checkIfAlreadyBuddiesService } from "./user.services.js";
import { unBuddyService } from "./user.services.js";
import { seeAllBuddiesService } from "./user.services.js";
import { checkOnBuddiesService } from "./user.services.js";
import { getNotificationsService } from "./user.services.js";
import { requestMedicService } from "./user.services.js";
import { getALLUSerMEdicRequestsService } from "./user.services.js";
export async function reportAnIncidentController(req: Request, res: Response, next: NextFunction){
    try{
        const userid = req.auth?.userId!;
        const type = req.body.type;
        const location = req.body.location;
        await reportAnIncidentService(userid, type, location);
        res.status(201).json({
            success: true
        });
    }catch(err){
        next(err);
    }
}
export async function getReportsController(req: Request, res: Response, next: NextFunction){
    try{
        const data = await getReportsService();
        res.status(200).json({
            success: true,
            data: data
        });
    }catch(err){
        next(err);
    }
}
export async function markAsSafeController(req: Request, res: Response, next: NextFunction){
    try{
         const userid = req.auth?.userId!;
         const report_id = req.body.report_id;
         await markAsSafeService(report_id, userid);
         res.status(201).json({
            success: true
         })
    }catch(err){
         next(err);
    }
}
export async function getStatusController(req: Request, res: Response, next: NextFunction){
    try{
        const userid = req.auth?.userId!;
        const report_id = req.body.report_id;
        const data = await getStatusService(report_id, userid);
        res.status(200).json(data);
    }catch(err){
        next(err);
    }
}
export async function markAsNeedHelpController(req: Request, res: Response, next: NextFunction){
    try{
        const userid = req.auth?.userId!;
        const report_id = req.body.report_id;
        const location = req.body.location;
        const details = req.body.details;
        await markAsNeedHelpService(report_id, userid, location, details);
        res.status(201).json({
            success: true
        });
    }catch(err){
        next(err);
    }
}
export async function markAsRescuedController(req: Request, res: Response, next: NextFunction){
    try{
        const userid = req.auth?.userId!;
        const report_id = req.body.report_id;
        await markAsRescuedService(report_id, userid);
        res.status(200).json({
            success: true
        })
    }catch(err){
        next(err);
    }
}
/*
export async function usersStatusOverviewController(req: Request, res: Response, next: NextFunction){
    try{
        const report_id = req.body.report_id;
        const data = await usersStatusOverviewService(report_id);
        res.status(200).json({
            success: true,
            data: data
        });
    }catch(err){
        next(err);
    }
}*/
export async function getProfileController(req: Request, res: Response, next: NextFunction){
    try{
         const userid = req.auth?.userId!;
         const user = await getProfileService(userid);
         
         res.status(200).json({
            success: true,
            data: user
         });
    }catch(err){
        next(err);
    }
}
export async function finishAccountSetupController(req: Request, res: Response, next: NextFunction){
    try{
        const userid = req.auth?.userId!;
        const occupation = req.body.occupation;
        const program = req.body.program;
        const bio = req.body.bio;
        await finishAccountSignupService(userid, occupation, program, bio);
        res.status(200).json({
            success: true
        });
    }catch(err){
        next(err);
    }
}
export async function searchUserController(req: Request, res: Response, next: NextFunction){
    try{
        const userid = req.auth?.userId!;
        const {name} = req.query;
        if (typeof name !== 'string' || name.trim().length < 2) {
            res.status(400).json({
                success: false,
                message: 'Search must contain at least 2 characters'
            });
            return;
        }
        const data = await searchUserService(name.trim(), userid);
         res.status(200).json({
            success: true,
            data: data
         });
    }catch(err){
         next(err);
    }
}
export async function setUserAsBuddyController(req: Request, res: Response, next: NextFunction){
    try{
        const selfId = req.auth?.userId!;
        const buddyId = req.body.buddy;
        const name = req.body.name;
        await setUserAsBuddyService(selfId, buddyId, name);
        res.status(201).json({
            success: true
        });
    }catch(err){
        next(err);
    }
}
export async function checkIfAlreadyBuddiesController(req: Request, res: Response, next: NextFunction){
    try{
        const selfId = req.auth?.userId!;
        const buddyId = req.body.buddy;
        const data = await checkIfAlreadyBuddiesService(selfId, buddyId);
        res.status(200).json(data);
    }catch(err){
        next(err);
    }
}
export async function unBuddyController(req: Request, res: Response, next: NextFunction){
    try{
        const selfId = req.auth?.userId!;
        const buddyId = req.body.buddy;
        await unBuddyService(selfId, buddyId);
        res.status(200).json({
            success: true
        })
    }catch(err){
        next(err);
    }
}
export async function visitUserProfileController(req: Request, res: Response, next: NextFunction){
    try{
        const buddyId = req.body.buddy;
        const user = await getProfileService(buddyId);
         res.status(200).json({
            success: true,
            data: user
         });
    }catch(err){
        next(err);
    }
}
export async function seeAllBuddiesController(req: Request, res: Response, next: NextFunction){
    try{
        const selfId = req.auth?.userId!;
        const buddies = await seeAllBuddiesService(selfId);
        res.status(200).json({
            success: true,
            data: buddies
        });
    }catch(err){
        next(err);
    }
}
export async function checkOnBuddiesController(req: Request, res: Response, next: NextFunction){
    try{
        const selfId = req.auth?.userId!;
        const data = await checkOnBuddiesService(selfId);
        res.status(200).json({
            success: true,
            data: data
        });
    }catch(err){
        next(err);
    }
}
export async function getNotificationsController(req: Request, res: Response, next: NextFunction){
    try{
        const selfId = req.auth?.userId!;
        const data = await getNotificationsService(selfId);
        res.status(200).json({
            success: true,
            data: data
        })
    }catch(err){
        next(err);
    }
}
export  async function requestMedicController(req: Request, res: Response, next: NextFunction){
    try{
        const userid = req.auth?.userId!;
        const location = req.body.location;
        const details = req.body.details;
        const name = req.body.name;
        await requestMedicService(userid, location, details, name);
        res.status(201).json({
            success: true
        });
    }catch(err){
        next(err);
    }
}
export async function getALLUSERMedicRequestsController(req: Request, res: Response, next: NextFunction){
    try{
        const userid = req.auth?.userId!;
        const data = await getALLUSerMEdicRequestsService(userid);
        res.status(200).json({
            success: true,
            data: data
        });
    }catch(err){
        next(err);
    }
}