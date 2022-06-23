const jwt = require("jsonwebtoken");
const blog = require("../models/blogModel.js")



let authoriseGetAndDelete = async function(req,res,next){
    try{let token = req.headers["x-api-key"]
    let decodedToken = jwt.verify(token, "functionup-radon")
    let authorId = req.query.authorId
    let userId = decodedToken.userId
    if(userId!=authorId)
    return  res.status(404).send({status : false, msg : "Not allowed to modify another data"})
     
    next()}
    catch(err){
      res.status(500).send({error : err.messsage})
  }
  }
   let authorisePutAndDelete = async function(req,res,next){
    try{let blogId= req.params.blogId
  let data = await blog.findById(blogId)
   let authorId = data.authorId
    let token = req.headers["x-api-key"]
    let decodedToken = jwt.verify(token, "functionup-radon")
    let userId = decodedToken.userId
     if(authorId!=userId)
     return res.status(403).send({status: false , msg : "Not allowed to modify another data"})
     
     next()}
     catch(err){
      res.status(500).send({error : err.messsage})
  }
  
  }
  let authorisePostBlog = async function(req,res,next){
    try{let authorId= req.body.authorId
    let token = req.headers["x-api-key"]
    let decodedToken = jwt.verify(token, "functionup-radon")
    let userId = decodedToken.userId
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