import type { Request, Response, NextFunction } from "express";
import { CheckIfEmailIsAlreadyUsed } from "./auth.repositories.js";
import { completeAccountRegistrationService } from "./auth.services.js";
import { logoutService } from "./auth.services.js";
import { loginService } from "./auth.services.js";
const FRONTEND_URL =
    process.env.FRONTEND_URL || "http://localhost:5500";


const getCookieOptions = (req: Request) => {
    const isHTTPS = req.secure;

    return {
        httpOnly: true,
        secure: isHTTPS,
        sameSite: isHTTPS ? "none" as const : "lax" as const,
        maxAge: 7 * 24 * 60 * 60 * 1000
    };
};
export async function passportController(req: Request, res: Response, next:NextFunction) {
    try{
    if (!req.user) {
        return res.status(401).json({
          message: "Google authentication failed."
        });
    }

    const email = req.user.emails?.[0]?.value;

    if (!email) {
        return res.status(400).json({
          message: "Google account did not provide an email."
        });
    }

    const emails = await CheckIfEmailIsAlreadyUsed(email);
    if(emails.length > 0){
        return res.send(`
        <script>
            window.opener.postMessage(
                "google-account-already-been-used",
                "${FRONTEND_URL}"
            );
            window.close();
        </script>
    `);
    }
    
    const firstName = req.user.name?.givenName;
    const lastName = req.user.name?.familyName;
    const fullName = `${firstName} ${lastName}`;
    const profile_pic = req.user.photos?.[0]?.value;
    if (!firstName) {
    return res.status(400).json({
        message: "Google account did not provide a first name."
    });
    }
    res.cookie("email", email, getCookieOptions(req));
    res.cookie("firstName", fullName, getCookieOptions(req));
    res.cookie("pic", profile_pic, getCookieOptions(req));
    
    return res.send(`
                <script>
                    window.opener.postMessage(
                        "google-signup-success",
                        "${FRONTEND_URL}"
                    );

                    window.close();
                </script>
            `);
    }catch(err){
      console.log(err);
      next(err)
    }
  }
  export async function completeAccountRegistrationController(req: Request, res: Response, next: NextFunction){
    try{
        const email = req.cookies.email;
        const name = req.cookies.firstName;
        const password = req.body.password;
        const profile_pic = req.cookies.pic;
        const signup = await completeAccountRegistrationService(email, password, name, profile_pic);
        res.cookie("accessToken", signup.accessToken, getCookieOptions(req));
        res.cookie("refreshToken", signup.refreshToken, getCookieOptions(req));
        const { accessToken, refreshToken, ...userData } = signup;
        res.clearCookie("email", getCookieOptions(req));
        res.clearCookie("firstName", getCookieOptions(req));
        res.clearCookie("pic", getCookieOptions(req));
        res.status(201).json(userData);
    }catch(err){
        next(err);
    }
  }
  export async function cancelAccountConfirmationController(req: Request, res: Response, next: NextFunction){
    try{
        res.clearCookie("email", getCookieOptions(req));
        res.clearCookie("firstName", getCookieOptions(req));
        res.clearCookie("pic", getCookieOptions(req));
        res.status(200).json({
            success: true
        });
    }catch(err){
        next(err);
    }
  }
  export async function logoutController(req: Request, res: Response, next: NextFunction){
    try{
        const userid = req.auth?.userId!;
        await logoutService(userid);
        res.clearCookie("accessToken", getCookieOptions(req));
        res.clearCookie("refreshToken", getCookieOptions(req))
        res.status(200).json({
            success: true
        });
    }catch(err){
        next(err);
    }
  }
  export async function loginController(req: Request, res: Response, next: NextFunction){
    try{
       
        const email = req.body.email;
        const password = req.body.password;
        const login = await loginService( email, password);
        res.cookie("accessToken", login.accessToken, getCookieOptions(req));
        res.cookie("refreshToken", login.refreshToken, getCookieOptions(req));
        const { accessToken, refreshToken, ...userData } = login;
        res.status(200).json(userData);
    }catch(err){
        next(err);
    }
  }