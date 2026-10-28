import { io } from "../server.js";
import { reportAnIncidentRepository } from "./user.repositories.js";
import { getReportsRepository } from "./user.repositories.js";
import { markAsSafeRepository } from "./user.repositories.js";
import { getStatusRepository } from "./user.repositories.js";
import { markAsNeedHelpRepository } from "./user.repositories.js";
import { getProfileRepository } from "./user.repositories.js";
import { markAsRescuedRepository } from "./user.repositories.js";
import { finishAccountSetupRepository } from "./user.repositories.js";
import { getUserReportsRepository } from "./user.repositories.js";
import { searchUsersRepository } from "./user.repositories.js";
import { setUserAsBuddyRepository } from "./user.repositories.js";
import { checkIFAlreadyABuddyRepository } from "./user.repositories.js";
import { unBuddyRepository } from "./user.repositories.js";
import { seeAllBuddiesRepository } from "./user.repositories.js";
import { checkOnBuddiesRepository } from "./user.repositories.js";
import { getNotofications } from "./user.repositories.js";
import { requestMedicRepository } from "./user.repositories.js";
import { getAllUserMedicalRequestRepository } from "./user.repositories.js";
import { personalDashboard } from "./user.repositories.js";
import { leaderboardRepository } from "./user.repositories.js";
export async function reportAnIncidentService(userid: string, type: string, location:string){
    try{
       const data =  await reportAnIncidentRepository(userid, type, location);
       io.emit("alert", {
         type: type,
         location: location,
         time: data.created_at
       });

    }catch(err){
        console.log(err);
        throw err;
    }
}
export async function getReportsService(){
    try{
        const data = await getReportsRepository();
        return data;
    }catch(err){
        console.log(err);
        throw err;
    }
}
export async function markAsSafeService(report_id: string, userid: string){
    try{
        await markAsSafeRepository(userid, report_id);
    }catch(err){
        console.log(err);
        throw err;
    }
}
export async function getStatusService(report_id: string, userid: string){
    try{
        const data = await getStatusRepository(report_id, userid);
        if(data.rowCount === 0){
            return {
                allow: true,
                success: true
            }
        }else{
            if(data.rows[0].status === 'Safe'){
                return {
                  allow: false,
                  success: true,
                  safe: true
                }
            }else{
                return {
                  allow: false,
                  success: true,
                  safe: false
                }
            }
           
        }
    }catch(err){
        console.log(err);
        throw err;
    }
}
export async function markAsNeedHelpService(report_id: string, userid: string, location: string, details: string){
    try{
        await markAsNeedHelpRepository(report_id, userid, location, details);
    }catch(err){
        console.log(err);
        throw err;
    }
}
export async function markAsRescuedService(report_id: string, userid: string){
    try{
        await markAsRescuedRepository(report_id, userid);
    }catch(err){
        console.log(err);
        throw err;
    }
}
/*
export async function usersStatusOverviewService(report_id: string){
    try{
        const data = await userStatusOverviewRepository(report_id);
        return data;
    }catch(err){
        console.log(err);
        throw err;
    }
}*/
export async function getProfileService(userid: string){
    try{
        const data = await getProfileRepository(userid);
        const { password, refreshtoken, email, status, ...data2} = data;
        const reports = await getUserReportsRepository(userid);
        return {
            data: data2,
            reports: reports
        };
    }catch(err){
        console.log(err);
        throw err;
    }
}
export async function finishAccountSignupService(userid: string, occupation: string, program: string, bio: string){
    try{
        await finishAccountSetupRepository(userid, occupation, program, bio);
    }catch(err){
        console.log(err);
        throw err;
    }
}
export async function searchUserService(name: string, selfId: string){
    try{
        const data = await searchUsersRepository(name, selfId);
        const users = data.map(({ password, refreshtoken, email, ...user }) => user);
        return users;
    }catch(err){
         console.log(err);
        throw err;
    }
}
export async function setUserAsBuddyService(selfId: string, buddy: string, name: string){
    try{
        await setUserAsBuddyRepository(selfId, buddy, name);
    }catch(err){
        console.log(err);
        throw err;
    }
}
export async function checkIfAlreadyBuddiesService(selfId: string, buddy: string){
    try{
        const data = await checkIFAlreadyABuddyRepository(selfId, buddy);
        if(data.length > 0){
            return {
                allow: false,
                success: true
            }
        }else{
            return {
                allow: true,
                success: true
            }
        }
    }catch(err){
        console.log(err);
        throw err;
    }
}
export async function unBuddyService(selfId: string, buddyId: string){
    try{
        await unBuddyRepository(selfId, buddyId);
    }catch(err){
        console.log(err);
        throw err;
    }
}
export async function seeAllBuddiesService(selfId: string){
    try{
        const data = await seeAllBuddiesRepository(selfId);
        return data;
    }catch(err){
        console.log(err);
        throw err;
    }
}
export async function checkOnBuddiesService(userid: string){
    try{
        const data = await checkOnBuddiesRepository(userid);
        return data;
    }catch(err){
        console.log(err);
        throw err;
    }
}
export async function getNotificationsService(userid: string){
    try{
        const data = await getNotofications(userid);
        return data;
    }catch(err){
        console.log(err);
        throw err;
    }
}
export async function requestMedicService(userid: string, location: string, details: string, name: string){
    try{
        const clinicAdminId = '52908f1d-9040-4528-a71f-e02adbaac420';
        const data = await requestMedicRepository(userid, location, details);
        const time = data.created_at;
        io.to(`user:${clinicAdminId}`).emit("request-medic", {
          location,
          details,
          time,
          name
        });
    }catch(err){
        console.log(err);
        throw err;
    }
}
export async function getALLUSerMEdicRequestsService(userid: string){
    try{
        const data = await getAllUserMedicalRequestRepository(userid);
        return data;
    }catch(err){
        console.log(err);
        throw err;
    }
}
export async function personalDashboardService(userid: string){
    try{
        const data = await personalDashboard(userid);
        return data;
    }catch(err){
        console.log(err);
        throw err;
    }
}
export async function leaderboardService(){
    try{
        const data = await leaderboardRepository();
        return data;
    }catch(err){
        console.log(err);
        throw err;
    }
}