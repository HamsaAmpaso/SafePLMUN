import rateLimit from "express-rate-limit";

export const reportLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 4,
    keyGenerator: (req) => req.auth?.userId!,
});