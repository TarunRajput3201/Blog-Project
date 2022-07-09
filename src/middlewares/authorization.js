const jwt = require("jsonwebtoken");
const blog = require("../models/blogModel.js")
const mongoose = require('mongoose');

let authoriseGetAndDelete = async function(req,res,next){
    try{
      let queryData=req.query
    let authorId = queryData.authorId
    
    if(!queryData){return res.status(400).send({status:false, msg: "please provide data for filter"})}

    if(!mongoose.isValidObjectId(authorId)){ return res.status(400).send({status:false, msg: "invalid author id"})     }
    let userId = req.user.userId

    if(userId!=authorId)
    return  res.status(403).send({status : false, msg : "Not allowed to modify another data"})
     
    next()}
    catch(err){
      res.status(500).send({error : err.messsage})
  }
  }
   let authorisePutAndDelete = async function(req,res,next){
    try{let blogId= req.params.blogId
      if(!mongoose.isValidObjectId(blogId)){ return res.status(400).send({status:false, msg: "invalid author id"})     }
  let data = await blog.findById(blogId)

  if(!data){return res.status(404).send({status:false, msg:"blogid doesnot exists"})}
   let authorId = data.authorId
   
    
    let userId = req.user.userId
    
     if(authorId!=userId)
     return res.status(403).send({status: false , msg : "Not allowed to modify another data"})
     
     next()}
     catch(err){
      res.status(500).send({error : err.messsage})
  }
  
  }
  let authorisePostBlog = async function(req,res,next){
    try{let authorId= req.body.authorId
  
    
    let userId = req.user.userId
     if(authorId!=userId)
     return res.status(403).send({status: false , msg : "Not allowed to modify another data"})
     
     next()}
     catch(err){
      res.status(500).send({error : err.messsage})
  }
  
  } 

module.exports.authorisePutAndDelete=authorisePutAndDelete
module.exports.authoriseGetAndDelete=authoriseGetAndDelete
module.exports.authorisePostBlog=authorisePostBlog