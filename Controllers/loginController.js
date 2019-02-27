var db = require('../model/connect');

module.exports = {

	login: function (req,res){

		var sql = `SELECT * FROM admin WHERE uname = "${req.body.uname}" AND pass = "${req.body.pass}"`;
	  	db.query(sql, function (err, rows, fields) {

	  		console.log(sql);

		    if (err){

		    	res.writeHead(200,{'Content-Type': 'text/html'});
		  		res.end("<script>alert('Error!"+err+"');window.location.replace('/login');</script>");
		  	
		    }
		    
		    if (rows.length == 0){

		    	res.writeHead(200,{'Content-Type': 'text/html'});
		  		res.end("<script>alert('Invalid Username/Password!');window.location.replace('/login');</script>");
		  	
		    }
		    
		    req.session.uname = req.body.uname;

		    console.log(rows.length);
			res.end("<script>window.location.replace('/createform');</script>");

		});

	},

	logout: function (req,res){

		req.session.destroy(function(err) {
		  if (err){

		    	res.writeHead(200,{'Content-Type': 'text/html'});
		  		res.end("<script>alert('Error!"+err+"')</script>");
		  	
		    }
		   else{
		   		res.writeHead(200,{'Content-Type': 'text/html'});
		  		res.end("<script>window.location.replace('/login');</script>");
		  	
		   }
		});
	}
	

};