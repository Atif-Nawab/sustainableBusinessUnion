// const express = require("express");
// const fs = require("fs");

// const mysql=require("mysql2");
// const path = require("path");


// const app = express();
// const PORT = 3000;
//  const PORT = process.env.PORT || 3000;

// middleware
// app.use(express.json());
// app.use(express.static("public"));
// app.use(express.static("admin"));
// app.use(express.urlencoded({extended:true}));

// 🔴 WRITE YOUR CODE HERE ⬇⬇⬇
// app.get("/homepage" , (req, res) =>{
//   res.render("./public/index.html");
// })

// app.post("/update-public-theme", (req, res) => {
//   const { primary, secondary } = req.body;

//   if (!primary || !secondary) {
//     return res.status(400).send("Missing colors");
//   }

//   const css = `
// :root {
//   --primary: ${primary};
//   --primary-dark: ${primary};
//   --secondary: ${secondary};
// }
// `;

//   fs.writeFileSync(
//     path.join(__dirname, "public/public-theme.css"),
//     css
//   );

//   res.sendStatus(200);
// });

// start server
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });


// const connection=mysql.createConnection({
//   host:'localhost',
//   user:'root',
//   database:'EventDatabase',
//   password:'5014',
//   dateStrings:true
// });

// let form=document.querySelector("#atif");
// console.log(form.innerText);
// app.get("/" , (req , res) =>{
//   res.sendFile(path.join(process.cwd(),"public/index.html"));
// })
// app.get('/ad',(req,res)=>{
  // const password="1234"

  // console.log(req.query.password)
  // let pass=req.query.password;
  // console.log(pass)
  // if(pass==password)
  // res.sendFile(path.join(process.cwd(),"admin/adminPage.html"));
  // else{
  //   alert("Wrong Password! Access Denied");
  //   res.send("<h1>error</h1>");
  // }
// })





// app.post("/addEvent", (req, res) => {
//   const { title, artists, date, time, location } = req.body;

//   const q = `
//     INSERT INTO events (title, artists, dates, time, location)
//     VALUES (?, ?, ?, ?, ?)
//   `;

//   connection.query(
//     q,
//     [title, artists, date, time, location],
//     (err, result) => {
//       if (err) {
//         console.error(err);
//         return res.status(500).json({ error: "Insert failed" });
//       }
//       // console.log(result);
//       res.json({ message: "Event added successfully" });
      
//     }
//   );
// });

// app.get("/getEvents",(req,res)=>{

//   let q="SELECT * FROM EVENTS ORDER BY DATES";
//   connection.query(q,(err,result)=>{
//     if (err) {
//         console.error(err);
//         return res.status(500).json({ error: "Extraction failed" });
//       }
//     else{
//       // console.log(result);
//       res.send(result);
//     }
//   })
// })
// connection.end();
// module.exports=app;




// Code for both local and vercel 

const express = require("express");
const mysql = require("mysql2");
const path = require("path");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "admin")));

// ✅ CREATE POOL (NOT connection)
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  dateStrings: true,
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0
});

// ROUTES
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/ad", (req, res) => {
  res.sendFile(path.join(__dirname, "admin", "adminPage.html"));
});

app.get("/getEvents", (req, res) => {
  pool.query("SELECT * FROM events ORDER BY dates", (err, result) => {
    if (err) {
      console.error("DB ERROR:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(result);
  });
});

app.post("/addEvent", (req, res) => {
  const { title, artists, date, time, location } = req.body;

  const sql = `
    INSERT INTO events (title, artists, dates, time, location)
    VALUES (?, ?, ?, ?, ?)
  `;

  pool.query(sql, [title, artists, date, time, location], (err) => {
    if (err) {
      console.error("INSERT ERROR:", err);
      return res.status(500).json({ error: "Insert failed" });
    }
    res.json({ message: "Event added successfully" });
  });
});

// LOCAL ONLY
if (process.env.NODE_ENV !== "production") {
  app.listen(3000, () => {
    console.log("Local server running on http://localhost:3000");
  });
}

module.exports = app;
