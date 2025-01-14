const express = require("express");
const URL = require("../model/url")
const {restrictTo} = require("../middlewares/auth")


const router = express.Router();

router.get('/', restrictTo(["Normal"]),async(req,res)=>{
    
    const allurls = await URL.find({cretaedBy:req.user._id})
    return res.render("home",{
    urls:allurls,
     })
})

router.get('/signup',(req,res)=>{
    return res.render("signup");
});

router.get("/login",(req,res)=>{
    return res.render("login")
})

module.exports=router

