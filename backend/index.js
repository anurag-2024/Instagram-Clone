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
const port=process.env.PORT || 5000;
const app = express();
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
app.use('/api',authRoutes);
app.use('/api',userRoutes);
app.use('/api',postRoutes);
connect()
.then(()=>{
    try{
        app.listen(port, () => {
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
