
const author = require('../models/authorModel.js')
const mongoose =require("mongoose");
const objectValidate= require("objectid-validator")
const blog = require('../models/blogModel.js')

let checkBody = async function(req,res,next){
  
    try{let data = req.body
  if (Object.keys(data).length == 0) {return res.status(400).send({status : false, msg : "Bad request- Please enter details in the request Body "})}
  
 next()
}

catch(err){
  res.status(500).send({error : err.messsage})
}}

let validAuthorId = async function(req,res,next){
   try {
     let id = req.body.authorId
     if(!mongoose.isValidObjectId(id)){ return res.status(400).send({status:false, msg: "invalid author id"})     }
  
    let check = await author.findById(id)

    if(!check)
    {return res.status(404).send({status: false, msg : "No such author is exists"})}
    
    else{next()}
}
catch(err){
    res.status(500).send({error : err.messsage})
}
}
let validBlogId = async function(req,res,next){
  try {
    let id = req.params.blogId
    if(!mongoose.isValidObjectId(id)){ return res.status(400).send({status:false, msg: "invalid author id"})     }
   let check = await blog.findById(id)

   if(!check)
    {return res.status(404).send({status: false, msg : "No such blog exists"})}
   
   next()
}
catch(err){
   res.status(500).send({error : err.messsage})
}
}



module.exports.validAuthorId= validAuthorId
module.exports.validBlogId= validBlogId
module.exports.checkBody=checkBody