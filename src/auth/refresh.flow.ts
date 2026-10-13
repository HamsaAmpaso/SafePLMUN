import type { Request, Response, NextFunction } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import { getRefreshToken } from "./auth.repositories.js";
import { insertRefreshToken } from "./auth.repositories.js";
import type { JwtUser } from '../types/passport.js';
dotenv.config();
const FRONTEND_URL =
    process.env.FRONTEND_URL || "http://127.0.0.1:5500";


const getCookieOptions = (req: Request) => {
    const isHTTPS = req.secure;

    return {
        httpOnly: true,
        secure: isHTTPS,
        sameSite: isHTTPS ? "none" as const : "lax" as const,
        maxAge: 7 * 24 * 60 * 60 * 1000
    };
};
export async function refreshMidlleware(req: Request, res: Response, next: NextFunction){
    try{
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
             return res.status(401).json({
                success: false,
                noRefreshToken: true,
                
             });
        }

        const decodedRefreshToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_JWT_SECRET!) as JwtUser;
        const refreshTokenFromDB = await getRefreshToken(decodedRefreshToken.userId);
        const isMatch = await bcrypt.compare(refreshToken, refreshTokenFromDB);

        if(!isMatch){
            return res.status(401).json({
                refreshTokenNotMatch: true,
                success: false,
                noRefreshToken: false
            })
        }

        const payload = {
            userId: decodedRefreshToken.userId,
            role: decodedRefreshToken.role,
            iss: "SafePLMUN",
         

        };

        const newAccessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_JWT_SECRET!, {
            expiresIn: "15m"
        });
        const newRefereshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_JWT_SECRET!, {
            expiresIn: "30d"
        });
        const hashedNewRefreshToken = await bcrypt.hash(newRefereshToken, 12);

        await insertRefreshToken(decodedRefreshToken.userId, hashedNewRefreshToken);

        res.cookie("accessToken", newAccessToken, getCookieOptions(req));
        res.cookie("refreshToken", newRefereshToken, getCookieOptions(req));


        res.status(200).json({
            success: true,
            refreshTokenNotMatch: false,
            noRefreshToken: false
        });
    
    
    }catch(err){
        console.log(err);
        res.status(401).json({
            success: false,
            refreshTokenNotMatch: false,
            noRefreshToken: false
        });
    }
}
