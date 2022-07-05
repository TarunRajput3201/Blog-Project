const mongoose = require('mongoose')
const author = require('../models/authorModel.js')
const blogModel = require('../models/blogModel.js')

const blog = require('../models/blogModel.js')


let createBlog = async function (req, res) {
    try {
        let bodyData = req.body
        let create = await blog.create(bodyData)

        res.status(201).send({ status: true, data: create })
    }
    catch (err) {
        res.status(500).send({ error: err.message })
    }
}


let filterBlogs = async function (req, res) {
    try {

         
        let queryData=req.query
        
        if(!mongoose.isValidObjectId(queryData.authorId)){ return res.status(400).send({status:false, msg: "invalid author id"})     }
        let authorId =queryData.authorId
        let category =queryData.category
        let tags =queryData.tags
        let subcategory =queryData.subcategory
        let data = await blog.find({ $and: [{$or: [{authorId:authorId}, {category:category},{tags:tags},{subcategory:subcategory}]}, { isDeleted: false  }, {isPublished:true}] })
        if (data.length > 0)
            return res.status(200).send({ status: true, data: data })
        else
            return res.status(404).send({ status: false, msg: "No data found" })

    }
    catch (err) {
        res.status(500).send({ error: err.message })
    }
}


let updateBlog = async function (req, res) {
    try {
        let blogId = req.params.blogId
        let bodyData = req.body
        
        

   
   
        let dataById = await blog.findById(blogId)
        if(!dataById)
    {return res.status(404).send({status: false, msg : "No such blog exists"})}
        let tag = dataById.tags

        let newTag = bodyData.tags
      if(newTag){  for (let i = 0; i < newTag.length; i++) {
            if (tag.includes(newTag[i])) {
                continue;
            } else {
                tag.push(newTag[i])
            }
        }}


        let subCategory = dataById.subcategory
        let newSubCategory = bodyData.subcategory
       if(newSubCategory){ for (let i = 0; i < newSubCategory.length; i++) {
            if (subCategory.includes(newSubCategory[i])) {
                continue;
            } else {
                subCategory.push(newSubCategory[i])
            }
        }}
        let title = req.body.title
        let body = req.body.body
        let isPublished=req.body.isPublished
        let update1 = await blog.findOneAndUpdate({ _id: blogId }, { $set: { title: title, boby: body, tags: tag, subcategory: subCategory, isPublished: isPublished, publishedAt: Date.now() } }, { new: true })
        res.status(200).send({ status: true,message:"updated succesfully", data: update1 })
    }
    catch (err) {
        res.status(500).send({ error: err.message })
    }
}
const deleteBlog = async function (req, res) {
    try {
        let blogId = req.params.blogId
        let data = await blog.find({ _id: blogId, isDeleted: false })
        if (data.length > 0) {
            let DeleteBlog = await blog.findOneAndUpdate({ _id: blogId }, { $set: { isDeleted: true, deletedAt: Date.now() } }, { new: true })
            res.status(200).send({status:true})

        }
        else return res.status(404).send({ status: false, msg: "no document found" })
    }
    catch (err) {
        res.status(500).send({ error: err.message })
    }
}
let deleteBlogs = async function (req, res) {
    try {
        let queryData=req.query
        
        if(!mongoose.isValidObjectId(queryData.authorId)){ return res.status(400).send({status:false, msg: "invalid author id"})     }
        let authorId =queryData.authorId
        let category =queryData.category
        let tags =queryData.tags
        let subcategory =queryData.subcategory
        if(!mongoose.isValidObjectId(authorId)){ return res.status(400).send({status:false, msg: "invalid author id"})}
        let dataToBeDeleted=await blog.find({ $in: [{ authorId:authorId },{ category:category },{ tags:tags },{ subcategory:subcategory }],  isPublished: false , isDeleted: false })
        if(dataToBeDeleted.length==0){return res.status(404).send({status:false, msg: "Already deleted"})}
        let data = await blog.updateMany({ $in: [{ authorId:authorId },{ category:category },{ tags:tags },{ subcategory:subcategory }, { isPublished: false }, { isDeleted: false }] }, { $set: { isDeleted: true, deletedAt: Date.now() } }, { new: true })
        if (!data) {
            return res.status(404).send({ status: false, msg: "No data found" })
        }
        return res.status(200).send({ status: true})
    }
    catch (err) {
        res.status(500).send({ error: err.message })
    }
}




module.exports = { createBlog, filterBlogs, updateBlog, deleteBlog, deleteBlogs }