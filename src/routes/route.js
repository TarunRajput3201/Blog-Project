const express = require('express');
const router = express.Router();

const {createBlog,filterBlogs,update1,deleteBlog,deleteBlogs} = require("../controllers/blogController.js")
const AuthorController = require("../controllers/authorController")
const authentication= require("../middlewares/authentication")
const authorization= require("../middlewares/authorization")
const validation=require("../middlewares/modelValidation")
const mid= require("../middlewares/idValidation.js")
router.post("/createAuthor",mid.checkBody,validation.validateAuthorModel  , AuthorController.createAuthor)

router.post("/login",mid.checkBody ,AuthorController.loginUser)

router.post("/createBlog", mid.checkBody,validation.validateBlogModel,authentication.authenticate,authorization.authorisePostBlog,  createBlog)

router.get("/getBlog",authentication.authenticate,authorization.authoriseGetAndDelete, filterBlogs)

router.put("/blog/:blogId",mid.checkBody,mid.validBlogId,authentication.authenticate,authorization.authorisePutAndDelete, update1)

router.delete("/blog/:blogId",authentication.authenticate,authorization.authorisePutAndDelete,mid.validBlogId, deleteBlog)

router.delete("/blogs",authentication.authenticate,authorization.authoriseGetAndDelete, deleteBlogs)
module.exports = router;
// router.route("/products")
// .post(createProduct)
// .get(getProduct)
