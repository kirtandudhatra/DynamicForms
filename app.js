var express = require('express');
var path    = require("path");
var bodyParser = require('body-parser');
var session = require('express-session');
var logindata = require('./Controllers/loginController');
var responsedata = require('./Controllers/responseController');
var form = require('./Controllers/formController');
var multer  = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'view/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
  }
});
var upload = multer({ storage: storage });
var app = express();

require('./routes')(app);



app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(session({secret: 'secretkey', saveUninitialized : true, resave : true}));



app.use(express.static(__dirname + '/view'));


app.post('/loginsubmit', function(req,res){

	logindata.login(req,res);

});
app.get('/logout', function(req,res){

	logindata.logout(req,res);

});


app.get('/createform', function(req,res){

	if(!req.session.uname){
		res.writeHead(200,{'Content-Type': 'text/html'});
		res.end("<script>alert('Login Required!');window.location.replace('/login');</script>");
		  	
	}
	else{
		res.sendFile(path.join(__dirname+"/view/createform.html"));	
	}
	
	

});
app.get('/viewall', function(req,res){

	if(!req.session.uname){
		res.writeHead(200,{'Content-Type': 'text/html'});
		res.end("<script>alert('Login Required!');window.location.replace('/login');</script>");
		  	
	}
	else{
		res.sendFile(path.join(__dirname+"/view/viewforms.html"));	
	}
	
	

});

app.get('/getdetailview', function(req,res){

	if(!req.session.uname){
		res.writeHead(200,{'Content-Type': 'text/html'});
		res.end("<script>alert('Login Required!');window.location.replace('/login');</script>");
		  	
	}
	else{
		res.sendFile(path.join(__dirname+"/view/details.html"));	
	}

});

app.get('/getcolumns', function(req,res){

	if(!req.session.uname){
		res.writeHead(200,{'Content-Type': 'text/html'});
		res.end("<script>alert('Login Required!');window.location.replace('/login');</script>");
		  	
	}
	else{
		responsedata.getcolumns(req,res);	
	}

});

app.get('/getdetails', function(req,res){

	if(!req.session.uname){
		res.writeHead(200,{'Content-Type': 'text/html'});
		res.end("<script>alert('Login Required!');window.location.replace('/login');</script>");
		  	
	}
	else{
		responsedata.getdetails(req,res);	
	}

});


app.get('/responses', function(req,res){

	if(!req.session.uname){
		res.writeHead(200,{'Content-Type': 'text/html'});
		res.end("<script>alert('Login Required!');window.location.replace('/login');</script>");
		  	
	}
	else{
		res.sendFile(path.join(__dirname+"/view/responses.html"));	
	}
	
	

});
app.post('/createform', function(req,res){

	form.createForm(req,res);
});
app.post('/submitform', upload.any(), function(req,res){

	form.submitForm(req,res);
});
app.get('/viewforms', function(req,res){

	form.getAllForms(req,res);
});
app.get('/approve', function(req,res){

	responsedata.approve(req,res);
});
app.get('/allusers', function(req,res){

	form.getUsers(req,res);
});
app.get('/getformdetails', function(req,res){

	form.getformdetails(req,res);
});
app.get('/form', function(req,res){

	res.sendFile(path.join(__dirname+"/view/form.html"));
});



app.listen(3000,'0.0.0.0');

console.log("Express app running on port 3000");

module.exports = app;