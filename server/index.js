require("dotenv").config();
let express = require('express');
let app = express();
let mongoose = require("mongoose");
let cors = require("cors");
let user = require("./models/user");

async function main(){
    await mongoose.connect(process.env.DB_URL);
}

main().then(() => console.log("connected to database")).catch((e) => console.log(e));

let corsOptions = {
    origin: function (origin, callback){
        if(origin === "http://localhost:5173"){
            callback(null, true);
        }
        else{
            callback(new Error("Not enabled by CORS"));
        }
    }
}
app.use(cors({
    origin: 'http://localhost:5173'
  }));
// app.use(express.urlencoded({extended: true}));
app.use(express.json())

app.get('/getHighest', async (req, res) => {
    let scores = await user.find({}).sort({topScore: 1});
    if(scores.length !== 0){
        let response = scores[0].topScore;
        res.send({result: response});
    }else{
        res.send({result: ""});
    }
})

app.get('/scores', async (req, res) => {
    let scores = await user.find({}).sort({topScore: 1});
    res.send(scores);
})

app.post('/login', async (req, res) => {
    let foundUser = await user.findOne({name: req.body.username});
    if(foundUser){
        if(foundUser.topScore > req.body.score){
            await user.findByIdAndUpdate(foundUser._id, {name: req.body.username, topScore: req.body.score});
        }
    }else{
        let user = {name: req.body.username, topScore: req.body.score};
        let newUser = new user(user);
        await newUser.save();
    }
    
})

app.listen(3000, () => {
    console.log("listening on port: 3000");
})