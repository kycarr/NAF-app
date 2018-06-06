import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/naf_db');
let db = mongoose.connection;
db.on('error', console.error.bind(console, "MongoDB connection error"));

const indexRoutes = require("./routes/index");
app.use("/",indexRoutes)

const PORT = process.env.PORT || 8080;
app.listen(PORT,()=>{
    console.log(`Node server started on ${PORT}`);
});