const express = require('express');
const router = express.Router();

const {createBlog,filterBlogs,updateBlog,deleteBlog,deleteBlogs} = require("../controllers/blogController.js")
const AuthorController = require("../controllers/authorController")
const authentication= require("../middlewares/authentication")
const authorization= require("../middlewares/authorization")
const validation=require("../middlewares/modelValidation")
const mid= require("../middlewares/idValidation.js")
router.post("/authors",mid.checkBody,validation.validateAuthorModel  , AuthorController.createAuthor)

router.post("/login",mid.checkBody , AuthorController.loginUser)

router.post("/blogs", mid.checkBody,validation.validateBlogModel,authentication.authenticate,authorization.authorisePostBlog,  createBlog)

router.get("/blogs",authentication.authenticate, filterBlogs)

router.put("/blogs/:blogId",mid.checkBody,authentication.authenticate,authorization.authorisePutAndDelete, updateBlog)

router.delete("/blogs/:blogId",mid.validBlogId,authentication.authenticate,authorization.authorisePutAndDelete, deleteBlog)

router.delete("/blogs",authentication.authenticate,authorization.authoriseGetAndDelete, deleteBlogs)

module.exports = router;

