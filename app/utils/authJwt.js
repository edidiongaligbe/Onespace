const jwt = require("jsonwebtoken");
const config = require("../utils/auth");

exports.generateToken = (member_id) => {
  var token = jwt.sign({ id: member_id }, config.secret, {
    expiresIn: 86400, // 24 hours
  });
  return token;
}

exports.verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};




/* verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
  
    if (!token) {
      return res.status(403).send({
        message: "No token provided!"
      });
    }
  
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Unauthorized!"
        });
      }
      req.userId = decoded.id;
      next();
    });
  };

 


  const authJwt = {
    verifyToken: verifyToken
  };

  module.exports = authJwt; */