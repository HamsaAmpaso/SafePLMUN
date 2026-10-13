import { poolDB } from "../db/db.js";

export async function getALLMEdicRequestsRepository(){
    try{
        const requests = await poolDB.query('SELECT requests.*, users.name, users.profile_pic, users.userid FROM requests JOIN users ON requests.requested_by = users.userid ORDER BY requests.created_at DESC');
        return requests.rows;
    }catch(err){
         console.log(err);
         throw err;
    }
}
export async function resolveRequestRepository(requestId: string, userid: string, selfId: string){
    const client = await poolDB.connect();
    try{
        await client.query('BEGIN');
        await client.query(`UPDATE requests SET state = 'Resolved' WHERE requestid = $1`, [requestId]);
        const data = await client.query(`INSERT INTO users_notifications (owned_by, triggered_by, about, message) VALUES ($1, $2, $3, $4) RETURNING *`, [userid, selfId, 'Medic Request Resolved', `Your medical request from the clinic has been resolved, thank you for your contribution towards a safer and more connected PLMUN.` ]);
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
export async function clinicDashBoardRepository(){
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
        const data = await poolDB.query(`SELECT COUNT(*) AS "requests", COUNT(*) FILTER (WHERE state = 'Resolved') AS "resolves", COUNT(*) FILTER (WHERE state = 'Pending' AND (created_at AT TIME ZONE 'Asia/Manila')::date =
        (CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Manila')::date)
         AS "pendingsToday", COUNT(*) FILTER (WHERE state = 'Resolved' AND (created_at AT TIME ZONE 'Asia/Manila')::date =
        (CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Manila')::date ) AS "resolvedToday",

                      
                     (
    SELECT json_agg(
        json_build_object(
            'day', days.day::date,
            'requests', COALESCE(daily.requests, 0)
        )
        ORDER BY days.day
    )
    FROM generate_series(
        (CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Manila')::date - 6,
        (CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Manila')::date,
        INTERVAL '1 day'
    ) AS days(day)
    LEFT JOIN (
        SELECT
            (created_at AT TIME ZONE 'Asia/Manila')::date AS day,
            COUNT(*) AS requests
        FROM requests
        WHERE created_at >= (
            ((CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Manila')::date - 6)
            AT TIME ZONE 'Asia/Manila'
        )
        AND created_at < (
            ((CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Manila')::date + 1)
            AT TIME ZONE 'Asia/Manila'
        )
        GROUP BY (created_at AT TIME ZONE 'Asia/Manila')::date
    ) AS daily
        ON daily.day = days.day::date
) AS "requestsPerDay" ,





                COUNT (*) FILTER (WHERE state = 'Pending') as "pendings",




                (
    SELECT json_agg(
        json_build_object(
            'location', building.location,
            'requests', building.requests
        )
        ORDER BY building.requests DESC
    )
    FROM (
        SELECT
            locations.location,
            COUNT(requests.requestid) AS requests
        FROM unnest($1::text[]) AS locations(location)
        LEFT JOIN requests
            ON requests.location = locations.location
        GROUP BY locations.location
    ) AS building
) AS "requestsPerBuilding"             
                      
                      FROM requests
                      `, [locations]);
        return data.rows[0];

    }catch(err){
        console.log(err);
        throw err;
    }
}