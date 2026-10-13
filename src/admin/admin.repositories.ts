import { poolDB } from "../db/db.js";
export async function setReportAsFalseAlarmRepository(report_id:string){
    const client = await poolDB.connect();
    try{
        await client.query("BEGIN");
        const message = `A report has been marked as false alarm by our SafePLMUN admin check it out!`;
        const about = 'False Alarm Alert';
        const triggered_by = '67a1bea0-9151-4e88-8820-46f44a35196b'
        await client.query(`UPDATE reports SET isfalsealarm = true WHERE report_id = $1`, [report_id]);
        await client.query('INSERT INTO users_notifications (owned_by, triggered_by, about, message) SELECT userid, $1, $2, $3 FROM users WHERE userid != $1', [triggered_by, about, message]);
        const report = await client.query('SELECT * FROM reports WHERE report_id = $1', [report_id]);
        await client.query("COMMIT");
        return report.rows[0]
    }catch(err){
        await client.query("ROLLBACK");
        console.log(err);
        throw err;
    }finally{
        client.release()
    }
}
export async function checkIfUserIsBannedRepository(userid: string){
    try{
        const data = await poolDB.query('SELECT * FROM bannedUsers WHERE banned_userid = $1', [userid]);
        return data.rows;
    }catch(err){
        console.log(err);
        throw err;
    }
}
export async function seeAllusersRepository(){
    try{
        const users = await poolDB.query(`SELECT users.name, users.profile_pic, users.userid, users.created_at, users.role, users.isbanned FROM users WHERE role = 'user'`);
        return users.rows;
    }catch(err){
        console.log(err);
        throw err;
    }
}
export async function banUserRepository(userid: string){
    const client = await poolDB.connect();
    try{
        const message = `Your emergency reporting and medical assistance request privileges have been suspended due to repeated false alarms.`;
        const about = 'Reporting Privileges Suspended';
        const triggered_by = '67a1bea0-9151-4e88-8820-46f44a35196b'
        await client.query("BEGIN");
        await client.query('UPDATE users SET isbanned = true WHERE userid = $1', [userid]);
        await client.query("INSERT INTO bannedusers (banned_userid) VALUES ($1)", [userid]);
        await client.query('INSERT INTO users_notifications (owned_by, triggered_by, about, message) VALUES ($1, $2, $3, $4)', [userid, triggered_by, about, message])
        await client.query("COMMIT");
    }catch(err){
        await client.query("ROLLBACK");
        console.log(err);
        throw err;
    }finally{
        client.release();
    }
}
export async function unbanUserRepository(userid: string){
    const client = await poolDB.connect();
    try{
        const message = `Your emergency reporting and medical assistance request privileges suspension have been lifted by our SafePLMUN admin.`;
        const about = 'Reporting Privileges Suspension Lifted';
        const triggered_by = '67a1bea0-9151-4e88-8820-46f44a35196b'
        await client.query("BEGIN");
        await client.query('UPDATE users SET isbanned = false WHERE userid = $1', [userid]);
        await client.query('DELETE FROM bannedusers WHERE banned_userid = $1', [userid]);
        await client.query('INSERT INTO users_notifications (owned_by, triggered_by, about, message) VALUES ($1, $2, $3, $4)', [userid, triggered_by, about, message]);
        await client.query("COMMIT");
    }catch(err){
        await client.query("ROLLBACK");
        console.log(err);
        throw err;
    }finally{
        client.release();
    }
}
export async function seeAllUsersStatusRepository(){
    try{
        const check = await poolDB.query(`SELECT reports.*, COALESCE(
            json_agg(
               json_build_object(
                   'userId', users.userid,
                   'name', users.name,
                   'status', users_status.status,
                   'location', users_status.location,
                   'details', users_status.details,
                   'statusCreatedAt', users_status.created_at,
                   'profile_pic', users.profile_pic
               ) 
            ) FILTER (WHERE users.userid != '67a1bea0-9151-4e88-8820-46f44a35196b'), '[]'::json) AS check FROM reports CROSS JOIN users LEFT JOIN users_status ON users_status.report_id_status = reports.report_id AND users_status.user_id_status = users.userid WHERE reports.isfalsealarm = false GROUP BY reports.report_id ORDER BY reports.created_at DESC`);
        return check.rows;   
    }catch(err){
        console.log(err);
        throw err;
    }
}

export async function adminDashboardRepository(){
    const locations = [
    "Student Center",
    "Covered Court",
    "Main Building",
    "Admin Building",
    "RLRC Building",
    "Centennial Park",
    "Serenity Garden",
    "North Park"
    ];
    try{
        const dashboard = await poolDB.query(`SELECT COUNT(*) FILTER(WHERE reports.isfalsealarm = false) AS "reports", COUNT(*) FILTER (WHERE reports.isfalsealarm = true ) AS "falseAlarms", COUNT(*) FILTER (WHERE reports.isfalsealarm = false AND (created_at AT TIME ZONE 'Asia/Manila')::date =
        (CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Manila')::date) AS "reportsToday", COUNT(*) FILTER (WHERE reports.isfalsealarm = true AND (created_at AT TIME ZONE 'Asia/Manila')::date =
        (CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Manila')::date) AS "falseReportsToday", 
        
        
        (SELECT json_agg(
        json_build_object(
           'day', days.day::date,
           'reports', COALESCE(daily.reports, 0)
        )
           ORDER BY days.day)
           
           FROM generate_series(
              (CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Manila')::date - 6,
              (CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Manila')::date,
              INTERVAL '1 day'
           ) AS days(day)
           LEFT JOIN (
           
             SELECT
               (created_at AT TIME ZONE 'Asia/Manila')::date AS day,
               COUNT(*) AS reports
               FROM reports
               WHERE isfalsealarm = false AND  created_at >= (
            ((CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Manila')::date - 6)
            AT TIME ZONE 'Asia/Manila'
            )
            AND created_at < (
            ((CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Manila')::date + 1)
            AT TIME ZONE 'Asia/Manila'
        )
            
           GROUP BY (created_at AT TIME ZONE 'Asia/Manila')::date 


           ) AS daily ON daily.day = days.day::date
           ) AS "reportsPerday",


           COUNT (*) FILTER (WHERE type = 'School Fire' AND reports.isfalsealarm = false) AS "fires",
           COUNT (*) FILTER (WHERE type = 'Earthquake' AND reports.isfalsealarm = false) AS "earthquakes",
           COUNT (*) FILTER (WHERE type = 'Armed Violence' AND reports.isfalsealarm = false) AS "schoolViolences",

        (
           
        SELECT json_agg(
          json_build_object(
             'location', building.location,
             'reports', building.reports
          )
             ORDER BY building.reports DESC
        )
             FROM (
             
             SELECT locations.location,
             COUNT(reports.report_id) AS reports
             FROM unnest($1::text[]) AS locations(location)
             LEFT JOIN reports ON reports.location = locations.location AND reports.isfalsealarm = false
    
             GROUP BY locations.location

             ) AS building

        ) AS "reportsPerBuilding" FROM reports
        `, [locations]);
        return dashboard.rows[0];
        
    }catch(err){
        console.log(err);
        throw err;
    }
}