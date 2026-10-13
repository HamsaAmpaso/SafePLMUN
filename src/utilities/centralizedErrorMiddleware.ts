import type { Request, Response, NextFunction, Errback } from "express";
export function centralizedErrorMiddleware(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.error("🔥 ERROR:", err);

    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal server error"
    });
}