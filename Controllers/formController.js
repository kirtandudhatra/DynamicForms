var db = require('../model/connect'); 
var fs = require('fs');

module.exports = {

	createForm: function (req,res){

		console.log(req.body);

		var title = (req.body.title).toString();
		var dbtablename = req.body.dbtablename;

		var sql = `CREATE TABLE ${dbtablename} (`;

	  	
		var i = 0;
		if(!req.body.dbname){
			res.writeHead(200,{'Content-Type': 'text/html'});
		  	res.end("<script>alert('Error!');window.location.replace('createform');</script>");
		  	
		}
		var textobj = {},fileobj={};
		while(req.body.dbname[i]){

			textobj[(req.body.dbname[i]).toString()] = [(req.body.name[i]).toString(),req.body.type[i]];

			if(i != 0){
				sql += ",";
				sql += (req.body.dbname[i]).toString()+" varchar(255) ";
			}
			else{
				sql += (req.body.dbname[i]).toString()+" varchar(255) NOT NULL";
			}
	
			i++;
		}
		var j=0;
		while(req.body.dbfname[j]){

			fileobj[(req.body.dbfname[j]).toString()] = (req.body.f[j]).toString();
		
			if(i != 0){
				sql += ",";
			}
			
			sql += (req.body.dbfname[j]).toString()+"path varchar(1000) ";
			j++;
		}

		sql += " , status varchar(12));";

		db.query(sql, function (err, rows, fields) {

	  		console.log(sql);

		    if (err){ 
		    	throw err;
		    	res.writeHead(200,{'Content-Type': 'text/html'});
		  		res.end("<script>alert('Error!"+err+"');window.location.replace('createform');</script>");
		  	
		    }
		    

		});

		var inputfields = {text: textobj,file: fileobj};
		inputfields = JSON.stringify(inputfields);
		console.log(typeof(inputfields));


		var sql2 = `INSERT INTO forms(name, inputs, table_name) VALUES("${title}",'${inputfields}','${dbtablename}')`;
		db.query(sql2, function (err, rows, fields) {

	  		console.log(sql2);

		    if (err){ 
		    	throw err;
		    	res.writeHead(200,{'Content-Type': 'text/html'});
		  		res.end("<script>alert('Error!"+err+"');window.location.replace('createform');</script>");
		  	
		    }

		   });
		res.writeHead(200,{'Content-Type': 'text/html'});
		res.end("<script>alert('Sucess');window.location.replace('viewall');</script>");
		res.end();

	},

	submitForm: function (req,res){


		var title = (req.body.title).toString();

		var sql = `INSERT INTO ${title}`;

		var i = 0, fields="", values="";

		Object.keys(req.body).forEach(function(element, key, _array) {

			if(element != "title"){

				if(i != 0 ){
					fields += `, `;
					values += `, `;
				}
				fields += element;
				values += "'"+req.body[element]+"'";
				i++;

			}

		});

		console.log(req.files);

		req.files.forEach(function(filedata){
			fields += ","+filedata.fieldname+"path";
			values += ",'/uploads"+filedata.filename+"'";

		});



		sql += `(${fields}) VALUES(${values})`;

		
		var sql3 = `UPDATE forms SET submissions = submissions+1 WHERE table_name = "${title}"`;


		db.query(sql3, function (err, rows, fields) {

			console.log(sql3);
			
		});

		db.query(sql, function (err, rows, fields) {

	  		console.log(sql);

		    if (err){ 
		    	throw err;
		    	res.writeHead(200,{'Content-Type': 'text/html'});
		  		res.end("<script>alert('Error!"+err+"');window.location.replace('createform');</script>");
		  	
		    }
		    
		  	else{
		  		res.writeHead(200,{'Content-Type': 'text/html'});
		  		res.end("<script>alert('Sucess');window.history.back();</script>");
		  	}

		});


	},

	getAllForms: function(req, res){

		var sql = `SELECT * FROM forms`;

		db.query(sql, function (err, rows, fields) {

	  		console.log(sql);

		    if (err){ 
		    	throw err;
		    	res.writeHead(200,{'Content-Type': 'text/html'});
		  		res.end("<script>alert('Error!"+err+"');window.location.replace('createform');</script>");
		  	
		    }
		    
		  	else{
		  		res.writeHead(200, { 'Content-Type': 'application/json'});
			    res.end(JSON.stringify(rows));
			    res.end();
		  	}

		});
	},

	getUsers: function(req, res){

		var sql = `SELECT * FROM admin`;

		db.query(sql, function (err, rows, fields) {

	  		console.log(sql);

		    if (err){ 
		    	throw err;
		    }
		    
		  	else{
		  		res.writeHead(200, { 'Content-Type': 'application/json'});
			    res.end(JSON.stringify(rows));
			    res.end();
		  	}

		});
	},

	getformdetails: function(req, res){
		var title = req.query.title;
		var sql = `SELECT * FROM forms WHERE name="${title}"`;
		db.query(sql, function (err, rows, fields) {

	  		console.log(sql);

		    if (err){ 
		    	throw err;
		    }
		    
		  	else{
		  		res.writeHead(200, { 'Content-Type': 'application/json'});
			    res.end(JSON.stringify(rows));
			    res.end();
		  	}

		});
	}

}




