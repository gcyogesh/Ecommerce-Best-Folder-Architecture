import express from 'express'
import dotenv from 'dotenv'


const app = express();
dotenv.config();

app.use(express.json())

import Connection from './connection/Database';
Connection()

import router from './routes/ProductRoute';
app.use('/api/v1/product', router);





const port = process.env.PORT || 6000
app.listen(port, ()=>{
    console.log(`app is running on port  ${port}`)
})