var mysql = require('mysql');
var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'rootuser',
    database:'facultylist'
})

module.exports = connection;