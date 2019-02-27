var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : '192.168.64.2',
    user     : 'root',
    password : '',
    database : 'DynamicFormTable'
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;