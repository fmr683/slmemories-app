import express from 'express';
//import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from './routes/posts.js'
import userRoutes from './routes/users.js'
import dontenv from 'dotenv'

const app = express();
dontenv.config();


app.use(express.urlencoded({extended: true, limit: "30mb"})); 
app.use(express.json({limit: "30mb", extends: true}));  

app.use(cors());


app.use('/posts', postRoutes)
app.use('/users', userRoutes)
app.get('/', (req, res) => {
    res.send('Hello to SL memories API')
})

const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewURLParser: true, useUnifiedTopology: true})
.then(()=> app.listen(PORT, () => console.log(`Server Runing on port ${PORT}`)))
.catch((error) => console.log("ERROR:", error.message));

//mongoose.set('useFindAndModify', false)