const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
const path = require('path');
const {connectToMongoDb} = require('./connection')
const {checkForAuthentication,restrictTo} = require('./middlewares/auth')
const URLmodel = require("./model/url")

const urlrouter = require('./routes/url')

const staticRoute = require('./routes/staticrouter')

const userRoute = require('./routes/user')
const PORT  = 8001;
connectToMongoDb('mongodb://localhost:27017/project02urlshortner')
.then(()=>console.log("MongoDB connected"));

app.set('view engine','ejs');
app.set('views',path.resolve("./views"))

app.get("/",async (req,res)=>{
  
    const allurl = await URLmodel.find({});
    return res.render("home",{
        urls:allurl,
    });
})

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser());
app.use(checkForAuthentication)

app.use('/url',restrictTo(["Normal"]),urlrouter)
app.use("/user",userRoute);
app.use("/",staticRoute)



app.get('/url/:shortId', async(req,res)=>{
    const shortId=req.params.shortId    
   const entry = await URLmodel.findOneAndUpdate({
        shortId,
    },{$push:{
        visitHistory: {
            timestamp:Date.now(),
        },
    }})

    res.redirect(entry.redirectUrl)
})


app.listen(PORT,()=>console.log("Server Started",PORT));