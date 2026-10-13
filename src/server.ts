import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import { poolDB } from './db/db.js';
import cookieParser from 'cookie-parser';
import { createServer } from "http";
import { Server } from "socket.io";
import { centralizedErrorMiddleware } from './utilities/centralizedErrorMiddleware.js';
import { authRouter } from './auth/auth.routes.js';
import { userRouter } from './user/user.routes.js';
import { clinicRouter } from './clinic-side/clinic.side.routes.js';
import { adminRouter } from './admin/admin.routes.js';
import passport from "passport";
import "./config/passport.js";
const app = express();
const httpServer = createServer(app);
export const io = new Server(httpServer, {
    cors: {
        origin: [
            "https://safeplmun.hamsaampaso1.workers.dev",
            "http://127.0.0.1:5500",
            "http://localhost:5500",
            "http://127.0.0.1:5173",
            "http://localhost:5173"
        ],
        credentials: true
    }
});
app.set("trust proxy", 1);
app.use(express.json());
app.use(passport.initialize());
app.use(cookieParser());
const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? ["https://eric-s-barbershop-customer-booking-system.pages.dev"]
    : [
        "http://localhost:5500",
        "http://127.0.0.1:5500",
        "http://localhost:5173",
        "http://127.0.0.1:5173"
      ];
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, or postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('CORS policy: Origin not allowed'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/clinic', clinicRouter);
app.use('/admin', adminRouter);
app.use(centralizedErrorMiddleware);
io.on("connection", (socket)=>{
    socket.on("register", (userId)=>{
       socket.join(`user:${userId}`);
    });
    socket.on("disconnect", (reason)=>{
        console.log(`Socket Disconnected: ${socket.id} Reason: ${reason}`);
    });
});
const PORT = Number(process.env.SERVER_PORT) || 3000;

async function startServer() {

    try {

        await poolDB.connect();

        httpServer.listen(PORT, () => {
            console.log("SafePLMUN server is running.");
        });

    } catch (err) {

        console.log(err);
        process.exit(1);

    }

}

startServer();