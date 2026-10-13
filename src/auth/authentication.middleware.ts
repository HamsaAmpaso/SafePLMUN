import dotenv from 'dotenv';
dotenv.config();
import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import type { JwtUser } from '../types/passport.js';

export  function authenticationMiddleware (req: Request, res: Response, next:NextFunction){
   try{
      const accessToken = req.cookies.accessToken;
      if(!accessToken){
        return res.status(401).json({
            success: false,
            addExpense: false,
            noAccessToken: true,
            invalidToken: false,
            tokenExpired: false,
            validationError: false
        });
      }

      const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_JWT_SECRET!);
      req.auth = decoded as JwtUser;
      next();
   }catch(err){
      console.log(err);
       if (err instanceof Error && err.name === "TokenExpiredError") {
        res.status(200).json({
            success: false,
            noAccessToken: false,
            invalidToken: false,
            tokenExpired: true,
            validationError: false
        });
        return;
    }

        res.status(401).json({
            success: false,
            noAccessToken: false,
            invalidToken: true,
            tokenExpired: false,
            validationError: false
        });
   }
}