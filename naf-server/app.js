// const express = require("express");
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var indexRoutes = require("./routes/index");
app.use("/",indexRoutes)


const PORT = process.env.PORT || 8888;






app.listen(PORT,()=>{
    console.log(`Node server started on ${PORT}`);
});