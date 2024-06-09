import express from 'express'
import dotenv from 'dotenv'


const app = express();
dotenv.config();

app.use(express.json())

import Connection from './connection/Database';
Connection()

import productRouter from './routes/ProductRoute';
app.use('/api/v1/product', productRouter);
import userRouter from './routes/UserRoute';
app.use('/api/v1/user', userRouter);



const port = process.env.PORT || 6000
app.listen(port, ()=>{
    console.log(`app is running on port  ${port}`)
})