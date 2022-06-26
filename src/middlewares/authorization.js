const jwt = require("jsonwebtoken");
const blog = require("../models/blogModel.js")
const mongoose = require('mongoose');
// let authorisation = async function(req,res,next){
//   let blogId = req.params.blogId
//   let userId = req.user.userId
//   let authorId= req.query.authorId
//   let authorId3 = req.body.authorId

//   let findData = await blog.findById(blogId)
//   let authorId2 = findData.authorId

//   if(!authorId){continue}
//   else{
//   if(userId!=authorId)
//   return res.status(400).send({status : false, msg : "Not allowed to modify another Account"})
//   }
   

//   if(authorId2){
//   if(userId!==authorId2)
//   return res.status(400).send({status : false, msg : "Not allowed to modify another Account"})
//   }
  

//   if(authorId3){
//   if(userId!=authorId3)
//   return res.status(400).send({status : false, msg : "Not allowed to modify another Account"})
//   }
  


//   next()
// }
// module.exports.authorisation=authorisation

let authoriseGetAndDelete = async function(req,res,next){
    try{
    let authorId = req.query.authorId
    if(!mongoose.isValidObjectId(authorId)){ return res.status(400).send({status:false, msg: "invalid author id"})     }
    let userId = req.user.userId

    if(userId!=authorId)
    return  res.status(404).send({status : false, msg : "Not allowed to modify another data"})
     
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