// const express = require('express');
import express from 'express'; //it is es6 type of importing express by("type" : "module")
import dotenv from 'dotenv';
import connectDatabase from "./Database/database.js";
import cookieParser from 'cookie-parser';
import cloudinary from "cloudinary";
import userRoutes from "./Routes/userRoutes.js";
import pinRoutes from "./Routes/pinRoutes.js";

dotenv.config();

cloudinary.v2.config({
    cloud_name: process.env.Cloud_Name,
    api_key: process.env.Cloud_Api,
    api_secret: process.env.Cloud_Secret,
  });

const app = express();
const port = process.env.PORT || 5000;
// const BASE_URL = process.env.BASE_URL;

//middlare
app.use(express.json());
app.use(cookieParser());

// app.get('/', (req, res) =>{
//     res.send("server are working");
// });

// using routes
app.use("/api/user", userRoutes);
app.use("/api/pin", pinRoutes);

app.get('/about', (req, res) => {
    res.send("this is my about page");
});

app.listen(port, ()=>{
    console.log(`server is runing on http://localhost:${port}`);
    // console.log(`server is runing on ${BASE_URL}`)
    connectDatabase();
});
