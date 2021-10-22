const app = require("express").Router();
const bodyParser = require("body-parser");
const cors = require('cors')
const jwt = require('jsonwebtoken')


require('dotenv').config();

app.use(cors());
app.use(bodyParser.json());

app.post('/signup', (req,res)=>{

    if(req.body.userName && req.body.email && req.body.password){
        let signupData={
            'userName': req.body.userName,
            'email': req.body.email,
            'phoneNo': req.body.phoneNo,
            'password': encPass,
            'activated' : false
        };
        let token = jwt.sign({
          name: req.body.userName, 
          status:"Authenticated",
          issueTime: Date.now(),
          expiryTime: Date.now()+900000,
        }, process.env.accessToken);
          res.status(200).send({"status":"success","success":"Authenticated","accessToken":token});
    }
    else{
        var str = ''
        if(!req.body.userName){
            str='User Name';
        }
        if(!req.body.email){
            str+=`${str === '' ? "" : ','} Email Id`;
        }
        if(!req.body.password){
            str+=`${str === '' ? "" : ','} Password`;
        }
        str+=' missing';
        res.status(406).send({"status":"error","error":str});
    }
})


app.post('/login', (req,res,next)=>{
    if(req.body.email && req.body.password){
        let token= jwt.sign({
            name: req.body.userName, 
            status:"Authenticated",
            issueTime: Date.now(),
            expiryTime: Date.now()+900000
          }, process.env.accessToken);
        res.status(200).send({"status":"success","success":"Authenticated","accessToken":token});
    }
    else{
        var str = ''
        if(!req.body.email){
            str+='Email Id';
        }
        if(!req.body.password){
            str+=`${str === '' ? "" : "and"}, Password`;
        }
        str+=' missing';
        res.status(406).send({"status":"error","error":str});
      }
})


module.exports=app;