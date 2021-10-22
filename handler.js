const serverless = require("serverless-http");
const express = require("express");
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const authentication = require('./auth');

app.use(cors());
app.use(bodyParser.json());
{
// app.use((req, res, next)=>{
//   let auth = req.headers.authorization;
//   if(auth){
//       jwt.verify(auth.split(" ")[1],process.env.accessToken), (err, data)=>{
//           if(err){
//             if(req.originalUrl.split("/").includes("auth"))
//                 next();
//             else res.status(500).send({status:"failed", message: "User not Authorized."});
//           }
//           else{
//               if(req.originalUrl.split('/').includes("auth")) res.status(401).send({status:"failed", message: "User already loggen in"});
//               else{
//                   next();
//               }
//           }
//       }
//   }
//   else{
//       if(req.originalUrl.split("/").includes("auth"))
//           next();
//       else res.status(500).send({status:"failed", message: "User not Authorized."});
//   }
// });
}
app.use("/auth",authentication);


module.exports.handler = serverless(app);
