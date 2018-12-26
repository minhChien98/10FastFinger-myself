var mongoose = require('mongoose');
var db = require('./../config')

const mlabURI = db.database;
const dbName = 'typing';

const con = mongoose.connect(mlabURI, (error) => {
	if(error){
		console.log("Error " + error);
	}else{
		console.log("Connected successfully to db server")
	}
});

module.exports = con;