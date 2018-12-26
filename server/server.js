const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = process.env.PORT || 8080;
const User = require('./models/user');
const connectDB = require('./utils/db');
var socketio = require("socket.io");
var cors = require('cors')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());

var server  = app.listen(PORT,function(err){
    if(err)
        return console.log(err);
    console.log(`Listening on ${ PORT }`);
});

var io = socketio(server);
var socketcontrol = require("./common/socketcontrol")(io);


app.get('/', (req, res) => {
    res.send(`Listening on ${ PORT }`);
})

app.get('/user',async (req,res) =>{
    let user = await User.find({});
    res.json(user);
    // res.send('ok');
} ) 

app.post('/user',async (req,res) =>{
    var user = new User({
        name: req.body.name,
        studentId: req.body.studentId,
        point: req.body.point,
        correctWord: req.body.correctWord,
        errorWord: req.body.errorWord
    });
    // result = User.addUser(user);
    user.save().then((user) => {
      res.send(user);
    }, (e) => {
      res.status(400).send(e);
    });
}) 

app.put('/user/:userID',async (req, res) => {
    var query = { id: req.params._id };
    let user = await User.findById( req.params.userID);
    user.correctWord = req.body.correctWord;
    user.point= req.body.point;
    user.errorWord= req.body.errorWord;
    await  user.save();
    res.json({status : 'success'});
  });

