const express = require("express")
const app = express()
const mongojs = require('mongojs')

const PORT = process.env.PORT || 3000

const dbConnection = process.env.ATLAS_DOG || "dogs"

const db = mongojs(dbConnection, ['dogs'])

db.on("error", error => {
    console.log("Database Error:", error);
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res)=>{
    db.dogs.find({}, (err, data)=>{
        console.log("_______")
        res.json(data)
    })  
})

app.get("/addsomedata", (req, res)=>{
    db.dogs.insert({name:"skadi", breed:"bulldog", age:3}, (err, data)=>{
        console.log("_______")
        res.json(data)
    })  
})

app.listen(PORT, ()=>{
    console.log("listening on port :" + PORT )
})