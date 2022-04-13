const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const db= require('./db.js')
const api = require('./api.js')

app.use(express.json())
const PORT = process.env.PORT || 80


if(process.env.NODE_ENV === "dev")
{
	var corsOptions = {
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200 // For legacy browser support
}

app.use(cors(corsOptions));
}
app.get('/heartbeat',(req,res)=>{
	res.send(`${Date.now()}`)
})

app.use('/api',api)
app.listen(PORT,()=>console.log('Live'))