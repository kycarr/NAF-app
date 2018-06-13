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
mongoose.connect('mongodb://yubowang:12345ict@173.212.211.214/naf_db');
let db = mongoose.connection;
db
.once('open',() => {
    console.log('Mongo DB Successfully connected');
    })
.on('error', console.error.bind(console, "MongoDB connection error"));


const indexRoutes = require("./routes/api/index");
app.use("/",indexRoutes)

const PORT = process.env.PORT || 8888;
app.listen(PORT,()=>{
    console.log(`Node server started on ${PORT}`);
});