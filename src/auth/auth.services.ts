import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();
import { completeAccountRegistration } from './auth.repositories.js';
import { insertRefreshToken } from './auth.repositories.js';
import { logoutRepository } from './auth.repositories.js';
import { loginRepository } from './auth.repositories.js';
export async function completeAccountRegistrationService(email: string, password: string, name: string, profile_pic: string){
    try{
        
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await completeAccountRegistration(email, hashedPassword, name, profile_pic);
        const payload = {
            userId: user.userid,
            role: user.role,
            iss: "SafePLMUN"
        }
        const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_JWT_SECRET!, {
        expiresIn: '30d'
        });
        const hashedRefreshToken = await bcrypt.hash(refreshToken, 12);
        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_JWT_SECRET!, {
        expiresIn: "1m"
        });
        await insertRefreshToken(user.userid, hashedRefreshToken);
        return {
            success: true,
            accessToken: accessToken,
            refreshToken: refreshToken,
            role: user.role ,
            userId: user.userid,
            signup: true,
            name: user.name,
            profile_pic: user.profile_pic
        }
    }catch(err){
        console.log(err);
        throw err;
        
    }
}
export async function logoutService(userid: string){
    try{
        await logoutRepository(userid);
    }catch(err){
        console.log(err);
        throw err;
    }
}
export async function loginService( email: string, password: string){
    try{
        const user = await loginRepository(email);
        if(user.rowCount === 0){
            return{
               login: false,
               success: false,
               userDoesNotExists: true,
            }
        }
        const isMatch = await bcrypt.compare(password, user.rows[0].password);

        if(!isMatch){
           return{
               login: false,
               success: false,
               wrongPassword: true
            }
        }

        const payload = {
            userId: user.rows[0].userid,
            role: user.rows[0].role,
            iss: "SafePLMUN"
        }

        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_JWT_SECRET!, {
            expiresIn: "1m"
        });

        const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_JWT_SECRET!, {
            expiresIn: "30d"
        });

        const hashedRefreshToken = await bcrypt.hash(refreshToken, 12);
        
        await insertRefreshToken(user.rows[0].userid, hashedRefreshToken);

        return{
               login: true,
               success: true,
               accessToken: accessToken,
               refreshToken: refreshToken,
               role: user.rows[0].role,
               userId: user.rows[0].userid,
               name: user.rows[0].name,
               profile_pic: user.rows[0].profile_pic
        }
    }catch(err){
        console.log(err);
        throw err;
    }
}