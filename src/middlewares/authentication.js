const jwt = require("jsonwebtoken");

const authenticate = function(req, res, next) {
    
       
   try{ token = req.headers["x-Api-key"];
    if (!token) {token = req.headers["x-api-key"]}
  
   
    if (!token) 

    return res.send({ status: false, msg: "token must be present" })
  
    
    
    
    jwt.verify(token,"functionup-radon", (err, user) => {
      if (err) 
          return res.status(401).send({msg: "invalid token"});
      

      req.user = user;
     
      
      next();
  });
  }
    catch(err) 

    {
        
        res.status(500).send(err.message)
     }




}


module.exports.authenticate=authenticate
