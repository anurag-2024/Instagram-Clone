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
import http from 'http';
import { Server } from 'socket.io';
const port=process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);
try{
    const io= new Server(server,{
        cors:{
            origin:"*",
            methods:["GET","POST","PUT","DELETE"]
        }
    });
    console.log("Socket setup successful");
    io.on('connection', (socket) => {
        console.log('A user connected:', socket.id);
        socket.on('disconnect', () => {
            console.log('A user disconnected:', socket.id);
        });
    });
}
catch(err){
    console.log("Socket setup failed");
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
