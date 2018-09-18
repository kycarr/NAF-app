// const express = require("express");
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

require("babel-core/register");
require("babel-polyfill");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;

/* Connection Mongo To LocalHost */

mongoose.connect('mongodb://localhost/naf_db');
let db = mongoose.connection;
db
.once('open',() => {
    console.log('Mongo DB Successfully connected');
    })
.on('error', console.error.bind(console, "MongoDB connection error"));



/* Connection Mongo to mLab */

// const db = require("./config/keys").mongoURI;
// mongoose
//   .connect(db)
//   .then(() => console.log("Mongo DB Connected"))
//   .catch(error => console.log(error));

const indexRoutes = require("./routes/api/index");
app.use("/",indexRoutes)

const PORT = process.env.PORT || 8080;
app.listen(PORT,()=>{
    console.log(`Node server started on ${PORT}`);
});