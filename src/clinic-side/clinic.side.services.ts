import { io } from "../server.js";
import { getALLMEdicRequestsRepository } from "./clinic.side.repositories.js";
import { resolveRequestRepository } from "./clinic.side.repositories.js";
import { clinicDashBoardRepository } from "./clinic.side.repositories.js";
export async function getAllMedicRequestsService(){
    try{
        const data = await getALLMEdicRequestsRepository();
        return data;
    }catch(err){
        console.log(err);
        throw err;
    }
}
export async function resolveRequestService(requestid : string, userid: string, selfId: string){
    try{
        const about = 'Medic Request Resolved';
        const message = `Your medical request from the clinic has been resolved, thank you for your contribution towards a safer and more connected PLMUN.`;
        const data = await resolveRequestRepository(requestid, userid, selfId);
        const time = data.created_at;
        io.to(`user:${userid}`).emit("medic-request-resolved", {
          about,
          message,
          time,
          userid
        });
    }catch(err){
        console.log(err);
        throw err;
    }
}
export async function clinicDashboardService(){
    try{
        const dashboard = await clinicDashBoardRepository();
        return dashboard;
    }catch(err){
        console.log(err);
        throw err;
    }
}