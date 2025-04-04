const express = require('express')
const app = express();
require('dotenv').config();
const cors = require('cors');
const bodyParser= require('body-parser');
const AuthRouter = require('./Routes/AuthRouter')
require('./Models/db')


const PORT = process.env.PORT || 8080;

app.get('/ping', (req,res)=>{
    res.send('pong');
});

app.use(bodyParser.json());
app.use(cors());

app.use('/auth', AuthRouter)

app.listen(PORT, ()=>{
    console.log(`Server is running on Port ${PORT}`)
})