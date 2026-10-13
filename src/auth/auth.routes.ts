import { Router } from "express";
import passport from "passport";
import dotenv from 'dotenv';
import { logoutController, passportController } from "./auth.controllers.js";
import { asyncControllerHandler } from "../utilities/asyncHandler.js";
import { cancelAccountConfirmationController } from "./auth.controllers.js";
import { completeAccountRegistrationController } from "./auth.controllers.js";
import { validator } from "./auth.validation.js";
import { userSchema } from "./auth.validation.js";
import { refreshMidlleware } from "./refresh.flow.js";
import { authenticationMiddleware } from "./authentication.middleware.js";
import { loginController } from "./auth.controllers.js";
import { userLoginSchema } from "./auth.validation.js";
dotenv.config();
import type { Request, Response, NextFunction } from "express";
export const authRouter = Router();

authRouter.get("/signup/google", (req, res, next) => {
    passport.authenticate("google", {
        scope: ["profile", "email"],
        session: false
    })(req, res, next);
});

authRouter.get(
  "/signup/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/signup",
  }), passportController
);

authRouter.post('/signup', validator(userSchema), asyncControllerHandler(completeAccountRegistrationController));
authRouter.get('/signup/cancellation', asyncControllerHandler(cancelAccountConfirmationController));
authRouter.post('/refresh', refreshMidlleware);
authRouter.get('/logout', authenticationMiddleware, asyncControllerHandler(logoutController));
authRouter.post('/login', validator(userLoginSchema), asyncControllerHandler(loginController));

