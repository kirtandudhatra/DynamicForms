var db = require('../model/connect');

module.exports = {

	getcolumns: function (req,res){

		var sql = `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = "${req.query.title}" ORDER BY ORDINAL_POSITION`;

		db.query(sql, function (err, rows, fields) {

			if (err){ 
		    	throw err;
		    	res.writeHead(200,{'Content-Type': 'text/html'});
		  		res.end("<script>alert('Error!"+err+"');window.location.replace('responses');</script>");
		  	
		    }
		    
		  	else{
		  		res.writeHead(200, { 'Content-Type': 'application/json'});
			    res.end(JSON.stringify(rows));
			    res.end();
		  	}


		});

	},

	getdetails: function (req,res){

		var sql = `SELECT * FROM ${req.query.title}`;

		console.log(sql);

		db.query(sql, function (err, rows, fields) {

			if (err){ 
		    	throw err;
		    	res.writeHead(200,{'Content-Type': 'text/html'});
		  		res.end("<script>alert('Error!"+err+"');window.location.replace('responses');</script>");
		  	
		    }
		    
		  	else{
		  		res.writeHead(200, { 'Content-Type': 'application/json'});
			    res.end(JSON.stringify(rows));
			    res.end();
		  	}


		});

	},

	approve: function (req,res){

		var sql = `UPDATE ${req.query.title} SET status = "approved" WHERE ${req.query.column} = "${req.query.value}"`;

		console.log(sql);

		db.query(sql, function (err, rows, fields) {

			if (err){ 
		    	throw err;
		    	res.writeHead(200,{'Content-Type': 'text/html'});
		  		res.end("<script>alert('Error!"+err+"');window.location.replace('responses');</script>");
		  	
		    }
		    
		  	else{
		  		res.writeHead(200,{'Content-Type': 'text/html'});
		  		res.end("<script>alert('success');window.location.replace('responses');</script>");
		  	
		  	}
		 });
	}



}