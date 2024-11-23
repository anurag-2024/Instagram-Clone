import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connect from './database/connect.js';
import morgan from 'morgan';
import authRoutes from './router/authRoutes.js';
import userRoutes from './router/userRoutes.js';
import postRoutes from './router/postroutes.js';
import notificationRoutes from './router/notificationsRoute.js';
import http from 'http';
import { Server } from 'socket.io';
const port=process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);
let io;

try {
    io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST", "PUT", "DELETE"],
            credentials: true
        },
        transports: ['websocket', 'polling']
    });
    
    const connectedUsers = new Map();

    io.on('connection', (socket) => {
        const userId = socket.handshake.query.userId;
        if (userId) {
            connectedUsers.set(userId.toString(), socket.id);
        }

        socket.on('user_connected', (userId) => {
            if (!userId) {
                return;
            }
            connectedUsers.set(userId.toString(), socket.id);
        });

        socket.on('disconnect', () => {
            for (const [userId, socketId] of connectedUsers.entries()) {
                if (socketId === socket.id) {
                    connectedUsers.delete(userId);
                    break;
                }
            }
        });
    });

    global.io = io;
    global.connectedUsers = connectedUsers;
    
    console.log("Socket setup successful");
} catch(err) {
    console.error("Socket setup failed:", err);
}
dotenv.config();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(morgan("tiny"));
app.disable("x-powered-by");
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/',(req,res)=>{
    res.send('Hello World');
});
app.use('/api/v1',authRoutes);
app.use('/api/v1',userRoutes);
app.use('/api/v1',postRoutes);
app.use('/api/v1',notificationRoutes);
connect()
.then(()=>{
    try{
        server.listen(port, () => {
            console.log("Server is running on " + port);
        });
     }
     catch(err){
        console.log("Cannot connect to Server");
     }
})
.catch(()=>{
    console.log("Invalid database connection");
});
