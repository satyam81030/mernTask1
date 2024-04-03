const express = require('express')
const connection = require('./config/dbConnect')
require('dotenv').config()
const cors = require('cors')

const port = process.env.PORT || 4000

const app = express();

app.use(express.json())
app.use(
    cors({
        origin : "http://localhost:3000",
        credentials : true
    })
)
const auth = require("./routes/authRoute")

app.use("/auth", auth)

connection.connect((err)=>{
    if (err) {
        console.log("Connection Failed", err)
    }else {
        console.log("Connection Successful")
    }
})


app.listen(port, ()=>{
    console.log(`App running on port ${port}`)
})