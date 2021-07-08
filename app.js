const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const ejs = require("ejs");
let name;
if (!name){
    name = "ضيف"
}
let points = 0;
let result;

const process = {
    firstNumber: 0,
    secondNumber: 0,
    result: 0
};

function randomNumber(){
    return Math.floor(Math.random() * 10) + 1;
}

function createQuestion(){
    const firstNumber = randomNumber();
    const secondNumber = randomNumber();
    process.firstNumber = firstNumber;
    process.secondNumber = secondNumber;
    process.result = process.firstNumber * process.secondNumber;
}

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs")


app.route("/")
.get((req,res)=>{
    res.sendFile(__dirname + "/index.html");
})
.post((req,res)=>{
    name = req.body.name;
    res.redirect( "/game")
});

app.route("/game")
.get((req,res)=>{
    createQuestion();
    res.render("game", {name: name,
         problem: process.firstNumber + " X " + process.secondNumber,
        points: points,
    result: result});
    let welcomeMessage = req.body.welcome;
    welcomeMessage = name;
})
.post((req,res)=>{
    const userResult = req.body.userResult;
    if (userResult == process.result){
        points++;
        result= "اجابة صحيحة يا " + name;
        res.redirect("/game");
    } else {
        result= "اجابة خاطئة الاجابة الصحيحة هي " + process.result + " يا " + name;
        res.redirect("/game");
    }
    
})
const port = 3000;
app.listen(port,()=>{
    console.log("Server is running on port 3000");
});