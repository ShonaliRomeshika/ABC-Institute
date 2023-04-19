const express=require('express');
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const cors = require("cors");


const app=express();


const PORT = 8000;

app.use(express.json());
app.use(express.urlencoded({extended : false}));


app.use(bodyParser.json());
app.use(cors());

const URL = "mongodb+srv://root:f*5pgJBpqJee5C3@cluster0.dxsdx.mongodb.net/?retryWrites=true&w=majority";


mongoose.connect(URL, {
    useNewUrlParser: "true",
});

//create a connection
const connection = mongoose.connection;
connection.once("open",()=>{
    console.log("Mongodb Connection Success!");

});

app.listen (PORT, () => {
    console.log(`Server is up and running on port: ${PORT}`)
})


//.... comment your route and add it here 
const router = require("./Routes/student.route.js");

app.use("/students", router);
