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
mongoose.connect('mongodb://localhost:27017/naf_db');
let db = mongoose.connection;
db.on('error', console.error.bind(console, "MongoDB connection error"));

//why here it always need mogoose.connection.db instead of just db.listCollections
db.on('open', function (ref) {
    console.log('All Collections');
    mongoose.connection.db.listCollections().toArray(function(err, collections){
    	if(err) {
    		console.log(err);
    	}
    	else{
	    	console.log(collections);
    	}
    //collections = [{"name": "coll1"}, {"name": "coll2"}]
	});
})
const indexRoutes = require("./routes/index");
app.use("/",indexRoutes)

const PORT = process.env.PORT || 8080;
app.listen(PORT,()=>{
    console.log(`Node server started on ${PORT}`);
});

