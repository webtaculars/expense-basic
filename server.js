var express        = require('express');
var app            = express();
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');

var port = process.env.PORT || 8080; 
var config = require('./config');

mongoose.connect(config.database, function(err){
    if(err){
        console.log(err);
    }else{
        console.log("Connected to db");
    }
});

app.use(bodyParser.json());  
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
app.use(bodyParser.urlencoded({ extended: true })); 

app.use(methodOverride('X-HTTP-Method-Override')); 
app.use(express.static(__dirname + '/public'));

require('./app/routes')(app); 
app.listen(port);   
console.log('Server running on port: ' + port);           
exports = module.exports = app;    