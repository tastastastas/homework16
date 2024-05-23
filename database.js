const express = require("express");
const bodyParser = require("body-parser");
const app = express();


app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json()) 

const mysql = require("mysql2/promise");
const dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: '',  
    database: 'student_database',
    port: 3306 
});



app.get('/students', async (req,res) => {
    const connection = await dbConn
    const rows = await connection.query('SELECT * from students')
    res.send(rows)
})


app.get('/students/:id', async (req,res)=>{
    const connection = await dbConn
    const rows = await connection.query('SELECT * from students where id = ' +req.params.id)
    res.send(rows)
})


app.delete('/students/:id', async (req,res)=>{

    const connection = await dbConn
    await connection.query('Delete from students where id = ' +req.params.id)
    res.status(204).send("Deleted id " + req.params.id + " successful" )
})


app.post("/students", async (req, res) => {
    
    const name = req.body.name;
    const age = req.body.age;
    const phone = req.body.phone;
    const email = req.body.email;

    const connection = await dbConn
    const rows = await connection.query("insert into students (name,age,phone,email) values('"+name+"','"+age+"',"+phone+",'"+email+"')")
    res.status(201).send(rows)
})



app.put("/students/:id", async (req, res) => {
    
    const id = req.params.id;
   
    const name = req.body.name;
    const age = req.body.age;
    const phone = req.body.phone;
    const email = req.body.email;

    const connection = await dbConn
    const rows = await connection.query("Update students set name = '"+name+"', age = '"+age+"', phone = "+phone+", email = '"+email+"' where id = "+id+" ")
    res.status(201).send(rows)
})



app.get("/query-1", async (req, res) => {
    const connection = await dbConn
    const rows = await connection.query('SELECT * from students')
    res.send(rows);
})

app.get("/query-2", async (req, res) => {
    const connection = await dbConn
    const rows = await connection.query('SELECT * from students')
    res.send(rows);
})

app.listen(3000, () => {
    console.log("Server is running at port 3000")
})
