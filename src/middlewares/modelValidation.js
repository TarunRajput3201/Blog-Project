const author = require('../models/authorModel.js')
const mongoose = require('mongoose');
const emailValidation=require("email-validator")
let validateAuthorModel = async function(req,res,next){
  try{  let data = req.body
    let check = data.fname
    if(!check)
  {return   res.status(400).send({status : false , msg : "Please enter your First Name"})}

    
    
    let check1 = data.lname
    if(!check1)
     {return res.status(400).send({status : false , msg : "Please enter your Last Name"})}
    


    let check2 = data.title
    if(!check2)
      {return  res.status(400).send({status : false , msg : "Please enter your Title"})}
    
    let check3 = ["Mr","Mrs","Miss"]
      let checkEnum = await check3.find(element => element==check2)
        if(!checkEnum)
        {return  res.status(400).send({status: false, msg : "Enter your Title from this Only [Mr, Mrs,Miss]"})}
        
    

        let checkEmail = data.email
        if(!checkEmail) {return res.status(400).send({status : false , msg : "Please enter your Email"})}


    
    let validateEmail= emailValidation.validate(checkEmail)


if(validateEmail==false)
 {return res.send({msg: "Please enter a valid email"})}

let checkDuplicateEmail=await author.findOne({email:checkEmail})
if(checkDuplicateEmail) return res.status(400).send({status:false , msg: "email id already exists please enter the new email id" })


    let checkPassword = data.password
    if(!checkPassword)
     {return res.status(400).send({status : false , msg : "Please enter your Password"})}
     if(data.password.length<8)
     {return res.status(400).send({status: false, msg: "password length must be atleast 8"  })}
     
    
    next()
}
catch(err){
    res.status(500).send({error : err.message})
}}

let validateBlogModel = async function(req,res,next){
   try{ let data=req.body
    let checkTitle = data.title
    if(!checkTitle)
    {return res.status(400).send({status : false , msg : "Please enter your Title"})}
    

    let checkBody = data.body
    if(!checkBody)
    {return res.status(400).send({status : false , msg : "Please enter Body"})}
    

    let checkAuthorId = data.authorId
    if(!checkAuthorId)
    {return res.status(400).send({status : false , msg : "Please enter authorId"})}
    if(!mongoose.isValidObjectId(checkAuthorId)){ return res.status(400).send({status:false, msg: "invalid author id"})     }
    
     let checkAuthor = await author.findById(checkAuthorId)
     if(!checkAuthor)
    { return res.status(404).send({status : false, msg : "Author does not exist"})}
     

     let checkCategory = data.category
    if(!checkCategory)
    {return res.status(400).send({status : false , msg : "Please enter category"})}
    
    next()
}
catch(err){
    res.status(500).send({error : err.message})
}
}
module.exports.validateAuthorModel=validateAuthorModel
module.exports.validateBlogModel=validateBlogModel