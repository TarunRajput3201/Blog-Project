const mongoose = require('mongoose')
const author = require('../models/authorModel.js')

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
        let queryData = req.query
        let data = await blog.find({ $and: [queryData, { isDeleted: false }] })
        if (data.length > 0)
            return res.status(200).send({ status: true, data: data })
        else
            return res.status(400).send({ status: false, msg: "No data found" })

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
        let tag = dataById.tags

        let newTag = bodyData.tags
        for (let i = 0; i < newTag.length; i++) {
            if (tag.includes(newTag[i])) {
                continue;
            } else {
                tag.push(newTag[i])
            }
        }


        let subCategory = dataById.subcategory
        let newSubCategory = bodyData.subcategory
        for (let i = 0; i < newSubCategory.length; i++) {
            if (subCategory.includes(newSubCategory[i])) {
                continue;
            } else {
                subCategory.push(newSubCategory[i])
            }
        }
        let title = req.body.title
        let body = req.body.body
        let update1 = await blog.findOneAndUpdate({ _id: blogId }, { $set: { title: title, boby: body, tags: tag, subcategory: subCategory, isPublished: true, publishedAt: Date.now() } }, { new: true })
        res.status(200).send({ status: true, msg: update1 })
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
            res.status(200).send({ status: "deleted" })

        }
        else return res.status(404).send({ status: false, msg: "no document found" })
    }
    catch (err) {
        res.status(500).send({ error: err.message })
    }
}
let deleteBlogs = async function (req, res) {
    try {
        let queryData = req.query
        let data = await blog.findOneAndUpdate({ $and: [queryData, { isPublished: false }, { isDeleted: false }] }, { $set: { isDeleted: true, deletedAt: Date.now() } }, { new: true })
        if (!data) {
            return res.status(400).send({ status: false, msg: "No data found" })
        }
        return res.status(200).send({ status: true, data: data })
    }
    catch (err) {
        res.status(500).send({ error: err.message })
    }
}



// module.exports.createBlog=createBlog

// module.exports.filterBlogs=filterBlogs
// module.exports.update1=update1
// module.exports.deleteBlog=deleteBlog
// module.exports.deleteBlogs=deleteBlogs
module.exports = { createBlog, filterBlogs, updateBlog, deleteBlog, deleteBlogs }