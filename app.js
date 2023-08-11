const express=require('express');
const app=express();
const bodyparser=require('body-parser');
const mongoose=require('mongoose');
const nodemailer = require('nodemailer');
const crypto = require('crypto-js');

var x;

var transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'saxenasamarth32@gmail.com',
        pass: 'ooomkanrcjhsilyd'
    }
});



app.use(express.json());
app.use(express.urlencoded());

main().catch(err => console.log(err));

async function main() {
//   await mongoose.connect('mongodb://127.0.0.1:27017/test');
await mongoose.connect('mongodb+srv://samarth:Samarth%407@samarth.fywaa0z.mongodb.net/?retryWrites=true&w=majority');
  console.log("connected to database!");

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const port=80;

app.use(express.static(__dirname + '/css'))
app.use(express.static(__dirname + '/images'))
app.use(express.static(__dirname + '/js'))


var contactSchema = new mongoose.Schema({
    subject: String,
    name: String,
    email: String,
    message: String
});

var Contact = mongoose.model('Contact',contactSchema);

var loginschema = new mongoose.Schema({
    name:String,
    email:String,
    password:String
})

const Productmodel=mongoose.model('users',loginschema);
let datatemp=new Productmodel();

app.get("/",(req,res)=>{
    const params={}
    res.sendFile(__dirname + '/login.html')
});


const savedb = async()=>{
    
    //let data=new Productmodel({name:nam,email:email,password:pass});
    let result=await datatemp.save();
    console.log(result);
    
}

const checkotp = async(otp,res)=>{
    if(otp==x){
        savedb();
        res.sendFile(__dirname+'/wedesign.html')
    }
    else{
        res.sendFile(__dirname+'/otp.html')
    }
}

const readdb = async(nam,email,password,res)=>{
    let data = await Productmodel.find({email:email});
    //console.log(data.length==0);
    if(data.length!=0){
    console.log("Account already exists");
    res.sendFile(__dirname+'/login.html');}
    else{
        x=Math.floor(Math.random()*9000+1000);
        datatemp=Productmodel({name:nam,email:email,password:crypto.AES.encrypt(password,"Samarth@7")});
        res.sendFile(__dirname+'/otp.html');
        var mailoptions = {
            from: 'saxenasamarth32@gmail.com',
            to: email,
            subject: 'Verification',
            html:`<!DOCTYPE html>
            <html>
                <head>
                <style>
                section{
                    background-image: linear-gradient(to right,rgb(0, 0, 0),rgb(70, 69, 69));
                    text-align: center;
                    height: auto;
                    display: flex;
                    width: auto;
                    line-height: 15px;
                    word-spacing: 2px;
                    letter-spacing: 1.2px;
                    border-radius: 15px;
                    margin: auto;
                }
                div{
                    background-image:linear-gradient(to left,rgb(32, 32, 32),rgb(79, 79, 79));
                    max-width: 100%;
                    min-width:60%;
                    text-align: center;
                    height: auto;
                    margin: 20px auto;
                    color: white;
                    line-height: 25px;
                    font-family:Arial, Helvetica, sans-serif;
                    font-size: 16px;
                    border-radius: 0px 10px 10px 10px;
                    padding: 10px;
                }
                    h2{
                        margin-bottom: 15px;
                    }
                    hr{
                        margin-top: 0px;
                        margin-bottom: 20px;
                        width: 150px;
                    }
                    #end{
                        text-align: left;
                        font-weight: 600;
                    }
                    #otp{
                        font-size: 24px;
                        font-weight: 600;
                    }
                </style>
                </head>
            
            <body>
                <section>
                    <div>
                        <h2>Verification Code</h2>
                        <hr>
                        <p>Please use the One-Time-Password below to sign up:</p>
                        <p id="otp">${x}</p>
                        <p>If you didn't request this, you can ignore this email.</p>
                        <br>
                        <p id="end">Thanks</p>
                        <p id="end">Team Wedesign</p>
                    </div>
                </section>
                  
            </body>
            </html>
            
    
    `
        };
        
        transport.sendMail(mailoptions,function(error,info){
            if(error)
            console.log(error);
            else
            console.log('Email Send: '+info.response);
        });
        // savedb(nam,email,password);
        // res.sendFile(__dirname+'/wedesign.html');
    }
}

const checklogin = async(email,pass,res)=>{
    let data = await Productmodel.find({email:email});
    if(data.length==0 || crypto.AES.decrypt(data[0].password,"Samarth@7").toString(crypto.enc.Utf8)!=pass){
        console.log("Incorrect email and password combination!");
        res.sendFile(__dirname+'/login.html');
    }
    else{
        console.log(`Welcome ${data[0].name}`)
        res.sendFile(__dirname+'/wedesign.html');
    }
}

app.post("/signup",(req,res)=>{
    //console.log(req.body.name,req.body.email,req.body.password);
    readdb(req.body.name,req.body.email,req.body.password,res);
});

app.post("/login",(req,res)=>{
    //console.log(req.body.email,req.body.password)
    checklogin(req.body.email,req.body.password,res);
});

app.post("/otp",(req,res)=>{
    checkotp(req.body.otp,res);
})

app.post("/",(req,res)=>{
    var myData = new Contact(req.body);
    //console.log(req.body);
    myData.save().then(()=>{
        res.send("Data Saved Successfully!")
    }).catch(()=>{
        res.status(400).send("Data Not Saved!")
    });
});

app.listen(port,()=>{
    console.log(`Server Started on port ${port}`);
});