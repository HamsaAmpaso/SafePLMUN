import { io } from "../server.js";
import { setReportAsFalseAlarmRepository } from "./admin.repositories.js";
import { seeAllusersRepository } from "./admin.repositories.js";
import { banUserRepository } from "./admin.repositories.js";
import { unbanUserRepository } from "./admin.repositories.js";
import { seeAllUsersStatusRepository } from "./admin.repositories.js";
import { adminDashboardRepository } from "./admin.repositories.js";
export async function setReportAsFalseAlarmService(report_id: string){
    try{
        const data = await setReportAsFalseAlarmRepository(report_id);
        const report = `The ${data.type} reported at ${data.location} has been marked as a false alarm by our SafePLMUN admin.`;
        const time = data.created_at;
        io.emit("false-alarm",{
           report,
           time
        });
    }catch(err){
        console.log(err);
        throw err;
    }
}
export async function seeAllUsersService(){
    try{
        const data = await seeAllusersRepository();
        return data;
    }catch(err){
        console.log(err);
        throw err;
    }
}
export async function banUserService(userid: string){
    try{
        await banUserRepository(userid);
    }catch(err){
        console.log(err);
        throw err;
    }
}
export async function unbanUserService(userid: string){
    try{
        await unbanUserRepository(userid);
    }catch(err){
        console.log(err);
        throw err;
    }
}
export async function seeAllUsersStatusService(){
    try{
        const data = await seeAllUsersStatusRepository();
        return data;
    }catch(err){
        console.log(err);
        throw err;
    }
}
export async function adminDashboardService(){
    try{
        const data = await adminDashboardRepository();
        return data;
    }catch(err){
        console.log(err);
        throw err;
    }
}