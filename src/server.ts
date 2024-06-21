import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import passport from './config/passport'
import session from 'express-session';





const app = express();
dotenv.config();

app.use(express.json())
app.use(cookieParser());

import Connection from './connection/Database';
Connection()


app.use(cors({
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE",
    credentials: true,
}));


app.use(session({
    secret:"23r32",
    resave:false,
    saveUninitialized:true
}))


app.use(passport.initialize())
app.use(passport.session())



import productRouter from './routes/ProductRoute';
app.use('/api/v1/product', productRouter);
import userRouter from './routes/UserRoute';
app.use('/api/v1/user', userRouter);
import AuthRouter from './routes/AuthRoute';
app.use(AuthRouter)



const port = process.env.PORT || 6000
app.listen(port, ()=>{
    console.log(`app is running on port  ${port}`)
})