import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

require('babel-polyfill');
require("babel-core/register");
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://yubowang:12345ict@173.212.211.214/naf_db?authSource=admin');
let db = mongoose.connection;
db.on('error', console.error.bind(console, "MongoDB connection error"));

// db.on('open', function (ref) {
//     console.log('All Collections');
//     mongoose.connection.db.listCollections().toArray(function(err, collections){
//     	if(err) {
//     		console.log(err);
//     	}
//     	else{
// 	    	console.log(collections);
//     	}
// 	});
// })
const indexRoutes = require("./routes/index");
app.use("/",indexRoutes)

const PORT = process.env.PORT || 8080;
app.listen(PORT,()=>{
    console.log(`Node server started on ${PORT}`);
});

