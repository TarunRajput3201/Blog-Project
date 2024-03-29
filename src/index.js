const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const mongoose= require('mongoose');
const app = express();
app.use(express.json());

mongoose.connect("mongodb+srv://TarunRajput3201:B07QeYy2JnV33rgz@cluster0.7eei6gq.mongodb.net/group16Database", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )


app.use('/', route);


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});
