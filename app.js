const express = require("express");
const userRoutes = require('./routes/userRoutes');
const mongodb = require('./db');

const app = express();
app.use(express.json());

/*------------- DB Connection ------------*/
mongodb;

/*------------Users Route-----------------*/
app.use('/users', userRoutes);

/*----------- Setup Server ------------*/
app.listen(5000, () => console.log("Server Started at port: 5000"));
