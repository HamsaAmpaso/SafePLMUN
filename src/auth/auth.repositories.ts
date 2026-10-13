import { poolDB } from "../db/db.js";
export async function completeAccountRegistration(email: string, password: string, name: string, profile_pic: string){
    try{
        const user = await poolDB.query(`INSERT INTO users (email, password, name, profile_pic) VALUES ($1, $2, $3, $4) RETURNING *`, [email, password, name, profile_pic]);
        return user.rows[0];
    }catch(err){
        console.log(err);
        throw err;
    }
}
export async function CheckIfEmailIsAlreadyUsed(email: string){
    try{
        const emails = await poolDB.query(`SELECT email from users WHERE email = $1`, [email]);
        return emails.rows;
    }catch(err){
        console.log(err);
        throw err;
    }
}
export async function insertRefreshToken(userid: string, refreshToken: string){
    try{
        await poolDB.query(
            `UPDATE users
             SET refreshtoken = $1
             WHERE userid = $2`,
            [refreshToken, userid]
        );
    }catch(err){
        console.log(err);
        throw err;
    }
}
export async function getRefreshToken(userid: string){
    try{
        const refreshToken = await poolDB.query(`SELECT refreshtoken AS "token" FROM users WHERE userid = $1`, [userid]);
        return refreshToken.rows[0].token;
    }catch(err){
        console.log(err);
        throw err;
    }
}
export async function logoutRepository(userid: string){
    try{
        const logout = await poolDB.query(`UPDATE users SET refreshToken = NULL WHERE userid = $1`, [userid]);
    }catch(err){
        console.log(err);
        throw err;
    }
}
export async function loginRepository(email:string){
    try{
        const login = await poolDB.query('SELECT * FROM users WHERE email = $1', [email]);
        return {
            rowCount: login.rowCount,
            rows: login.rows
        }
        
    }catch(err){
        console.log(err);
        throw err;
    }
}