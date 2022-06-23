const { count } = require("console")
const AuthorModel = require("../models/authorModel")
const jwt = require("jsonwebtoken");
const createAuthor = async function (req, res) {
    try {
        let data = req.body
        console.log(data)
         
            let savedData = await AuthorModel.create(data)
            res.status(201).send({ msg: savedData })
        
         
    }
    catch (err) {
        console.log("This is the error :", err.message)
        res.status(500).send({ msg: "Error", error: err.message })
    }
}
const loginUser = async function (req, res) {
   let userName = req.body.emailId;
    let password = req.body.password;
  
    let user = await AuthorModel.findOne({ emailId: userName, password: password });
    if (!user)
      return res.send({
        status: false,
        msg: "username or the password is not corerct",
      });
      let token = jwt.sign(
        {
          userId: user._id.toString(),
          
        },
        "functionup-radon"
      );
      res.setHeader("x-api-key", token);
      res.send({ status: true, data: token });
      }
    



module.exports.createAuthor=createAuthor
module.exports.loginUser=loginUser 



