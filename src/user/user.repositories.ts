
import { poolDB } from "../db/db.js";
export async function reportAnIncidentRepository(userid: string, type: string, location: string){
    try{
        const report = await poolDB.query(`INSERT INTO reports (type, location, reported_by) VALUES ($1, $2, $3) RETURNING *`, [type, location, userid]);
        return report.rows[0];
    }catch(err){
        console.log(err);
        throw err;
    }
}
export async function getReportsRepository() {
    try {
        const reports = await poolDB.query(`
            SELECT
                reports.*,
                users.profile_pic,
                users.name,
                COUNT(users_status.*) FILTER (
                    WHERE users_status.status = 'Safe'
                ) AS "safe",
                COUNT(users_status.*) FILTER (
                    WHERE users_status.status = 'Need help'
                ) AS "help"
            FROM reports
            JOIN users
                ON reports.reported_by = users.userid
            LEFT JOIN users_status
                ON reports.report_id = users_status.report_id_status
            GROUP BY reports.report_id, users.profile_pic, users.name
            ORDER BY reports.created_at DESC
        `);

        return reports.rows;
    } catch (err) {
        console.log(err);
        throw err;
    }
}
export async function markAsSafeRepository(userid: string, report_id: string, status: string = 'Safe', location: string = 'Evacuated'){
    try{
      await poolDB.query(`INSERT INTO users_status (report_id_status, user_id_status, status, location) VALUES ($1, $2, $3, $4)` , [report_id, userid, status, location]);
    }catch(err){
        console.log(err);
        throw err;
    }
    
}
export async function getStatusRepository(report_id: string, userid: string){
    try{
        const get = await poolDB.query(`SELECT * FROM users_status WHERE report_id_status = $1 AND user_id_status = $2`, [report_id, userid]);
        return get;
    }catch(err){
        console.log(err);
        throw err;
    }
}
export async function markAsNeedHelpRepository(report_id: string, userid: string, location: string, details: string, status: string = 'Need help'){
    try{
        await poolDB.query(`INSERT INTO users_status (report_id_status, user_id_status, status, location, details) VALUES ($1, $2, $3, $4, $5)` , [report_id, userid, status, location, details]);
    }catch(err){
        console.log(err);
        throw err;
    }
}
export async function markAsRescuedRepository(report_id: string, userid: string){
    try{
        await poolDB.query(`UPDATE users_status SET status = 'Safe', location = 'Evacuated', details = 'None' WHERE report_id_status = $1 AND user_id_status = $2`, [report_id, userid]);
    }catch(err){
        console.log(err);
        throw err;
    }
}
/*
export async function userStatusOverviewRepository(report_id: string) {
    try {
        const overview = await poolDB.query(
            `SELECT
                COUNT(*) FILTER (WHERE status = 'safe') AS "safe",
                COUNT(*) FILTER (WHERE status = 'in need of help') AS "help"
             FROM users_status
             WHERE report_id_status = $1`,
            [report_id]
        );
        return overview.rows[0];
    } catch (err) {
        console.log(err);
        throw err;
    }
}*/

export async function getProfileRepository(userid: string){
    try{
        const user = await poolDB.query(`SELECT * FROM users WHERE userid = $1`, [userid]);
        console.log(user.rows[0]);
        return user.rows[0];
    }catch(err){
        console.log(err);
        throw err;
    }
}
export async function finishAccountSetupRepository(userid: string, occupation: string, program: string, bio: string){
    await poolDB.query(`UPDATE users SET occupation = $1, program = $2, bio = $3 WHERE userid = $4`, [occupation, program, bio, userid]);
}
export async function getUserReportsRepository(userid: string){
    try{
        const userReports = await poolDB.query(`
            SELECT
                reports.*,
                users.profile_pic,
                users.name,
                COUNT(users_status.*) FILTER (
                    WHERE users_status.status = 'Safe'
                ) AS "safe",
                COUNT(users_status.*) FILTER (
                    WHERE users_status.status = 'Need help'
                ) AS "help"
            FROM reports
            JOIN users
                ON reports.reported_by = users.userid
            LEFT JOIN users_status
                ON reports.report_id = users_status.report_id_status
            WHERE reports.reported_by = $1
            GROUP BY reports.report_id, users.profile_pic, users.name
            ORDER BY reports.created_at DESC
        `, [userid]);
        return userReports.rows;
    }catch(err){
        console.log(err);
        throw err;
    }
}
export async function searchUsersRepository(name: string, selfId: string) {
    try {
        const users = await poolDB.query(`
            SELECT *
            FROM users
            WHERE name ILIKE $1 AND userid != $2
            ORDER BY name
            LIMIT 20
        `, [`%${name}%`, selfId]);

        return users.rows;
    } catch (err) {
        console.log(err);
        throw err;
    }
}
export async function setUserAsBuddyRepository(selfId: string, buddy: string, name: string){
   const client = await poolDB.connect();
   try{
     await client.query("BEGIN");
     await client.query(
        `INSERT INTO buddies (user_id, buddies_with)
         VALUES ($1, $2)`,
        [selfId, buddy]
     );
     await client.query(
        `INSERT INTO buddies (user_id, buddies_with)
         VALUES ($1, $2)`,
        [buddy, selfId]
     );
     const about = `Buddy`;
     const message = `${name} has added you as a SafePLMUN buddy you can now see each other's status during an emergency.`;
     await client.query(`INSERT INTO users_notifications (owned_by, triggered_by, about, message) VALUES ($1, $2, $3, $4)`, [buddy, selfId, about, message]);
     await client.query("COMMIT");
   }catch(err){
     await client.query("ROLLBACK");
     console.log(err);
     throw err;
   }finally{
     client.release();
   }
}
export async function checkIFAlreadyABuddyRepository(userid: string, buddy: string){
    try{
        const result = await poolDB.query(`SELECT * FROM buddies WHERE user_id = $1 AND buddies_with = $2`, [userid, buddy]);
        return result.rows;
    }catch(err){
        console.log(err);
        throw err;
    }
}
export async function unBuddyRepository(selfId: string, buddyId: string){
    const client = await poolDB.connect();
    try{
        await client.query("BEGIN");
        await client.query(`DELETE FROM buddies WHERE user_id = $1 AND buddies_with = $2`, [selfId, buddyId]);
        await client.query(`DELETE FROM buddies WHERE user_id = $1 AND buddies_with = $2`, [buddyId, selfId]);
        await client.query("COMMIT");
    }catch(err){
        await client.query("ROLLBACK");
        console.log(err);
        throw err;
    }finally{
     client.release();
   }
}
export async function seeAllBuddiesRepository(selfId: string){
    try{
        const buddies = await poolDB.query(`SELECT users.name, users.occupation, users.role, users.created_at, users.userid, users.bio, users.program, users.profile_pic, buddies.* FROM buddies JOIN users ON buddies.buddies_with = users.userid WHERE user_id = $1 ORDER BY buddies.created_at DESC`, [selfId]);
        return buddies.rows;
    }catch(err){
        console.log(err);
        throw err;
    }
}
export async function checkOnBuddiesRepository(userId: string) {
    try {
        const checkBuddies = await poolDB.query(`
            SELECT
                reports.*,
                COALESCE(
                    json_agg(
                        json_build_object(
                            'userId', buddies.buddies_with,
                            'name', users.name,
                            'status', users_status.status,
                            'location', users_status.location,
                            'details', users_status.details,
                            'statusCreatedAt', users_status.created_at,
                            'profile_pic', users.profile_pic
                        )
                    ) FILTER (WHERE buddies.buddies_with IS NOT NULL),
                    '[]'
                ) AS buddies
            FROM reports
            JOIN buddies
                ON buddies.user_id = $1
            LEFT JOIN users_status
                ON users_status.report_id_status = reports.report_id
                AND users_status.user_id_status = buddies.buddies_with
            JOIN users
                ON users.userid = buddies.buddies_with
            WHERE reports.isfalsealarm = false
            GROUP BY reports.report_id
            ORDER BY reports.created_at DESC
        `, [userId]);

        return checkBuddies.rows;

    } catch (err) {
        console.log(err);
        throw err;
    }
}
export async function getNotofications(userid: string){
    try{
        const notification = await poolDB.query(`SELECT * FROM users_notifications WHERE owned_by = $1 ORDER BY created_at DESC`, [userid]);
        return notification.rows;
    }catch(err){
        console.log(err);
        throw err;
    }
}
export async function requestMedicRepository(userid: string, location: string, details: string){
    const client = await poolDB.connect();
    const clinicAdminId = '52908f1d-9040-4528-a71f-e02adbaac420';
    try{
        client.query('BEGIN');
        const data = await client.query(`INSERT INTO requests (requested_by, location, details) VALUES ($1, $2, $3) RETURNING *`, [userid, location, details]);
        const about = 'Request Medic';
        const message = `A SafePLMUN user is requesting medical attention at ${location}, ${details}, be urgent and attentive!`;
        await client.query(`INSERT INTO users_notifications (owned_by, triggered_by, about, message) VALUES ($1, $2, $3, $4)`, [clinicAdminId, userid, about, message ]);
        await client.query("COMMIT");
        return data.rows[0];
    }catch(err){
        await client.query("ROLLBACK");
        console.log(err);
        throw err;
    }finally{
        client.release()
    }
}
export async function getAllUserMedicalRequestRepository(userid: string){
    try{
        const requests = await poolDB.query(`SELECT requests.*, users.name, users.profile_pic, users.userid FROM requests JOIN users ON requests.requested_by = users.userid WHERE requests.requested_by = $1 ORDER BY requests.created_at DESC`, [userid]);
        return requests.rows;
    }catch(err){
        console.log(err);
        throw err;
    }
}
