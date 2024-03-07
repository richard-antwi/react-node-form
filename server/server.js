const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const path = require('path')
const app = express();
const port = 3000;

//middleware codes
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extend:true}));

//Create MYSQL server connection
const connection = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodeProject'
});

//connect to the database MYSQL server AND check if conection successful
 connection.connect((err) => {
    if(err){
        console.log('Error connecting th MYSQL:', err);
    }else{
        console.log('Connected to MYSQL');
    }
});

//creating a rout handle form submission   API Routes
app.post(`/submit`,(req,res)=>{


//Get or Extract data from the form
//const {name, email}= req.body;
const {name, email }= req.body;


//Insert data into MYSQL Database
const query = 'INSERT INTO  users (name, email) VALUES (?,?)';

connection.query(query,[name,email],(err, results) => {
    if(err){
        console.log('Error inserting data Into Database', err);
        res.status(500).send('Error inserting data Into Database');
        return;
    }
        console.log('Data inserted into Database successful');
        res.status(200).send('Data inserted Sucessfully');
    });
});



//server React FrontEnd
app.use(express.static(path.join(__dirname, 'public')));

app.get('*',(_req,res)=>{
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


//start server
app.listen(port,()=>{
    console.log(`Sever is running on port ${port}`);
});