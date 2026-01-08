const express = require("express");
const fs = require("fs");

const mysql=require("mysql2");
const path = require("path");


const app = express();
const PORT = 3000;

// middleware
app.use(express.json());
app.use(express.static("public"));
app.use(express.static("admin"));
app.use(express.urlencoded({extended:true}));

// 🔴 WRITE YOUR CODE HERE ⬇⬇⬇
// app.get("/homepage" , (req, res) =>{
//   res.render("./public/index.html");
// })

app.post("/update-public-theme", (req, res) => {
  const { primary, secondary } = req.body;

  if (!primary || !secondary) {
    return res.status(400).send("Missing colors");
  }

  const css = `
:root {
  --primary: ${primary};
  --primary-dark: ${primary};
  --secondary: ${secondary};
}
`;

  fs.writeFileSync(
    path.join(__dirname, "public/public-theme.css"),
    css
  );

  res.sendStatus(200);
});

// start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


const connection=mysql.createConnection({
  host:'localhost',
  user:'root',
  database:'EventDatabase',
  password:'5014',
  dateStrings:true
});

// let form=document.querySelector("#atif");
// console.log(form.innerText);
app.get('/ad',(req,res)=>{
  // const password="1234"

  // console.log(req.query.password)
  // let pass=req.query.password;
  console.log(pass)
  // if(pass==password)
  res.redirect("adminPage.html");
  // else{
  //   alert("Wrong Password! Access Denied");
  //   res.send("<h1>error</h1>");
  // }
})





app.post("/addEvent", (req, res) => {
  const { title, artists, date, time, location } = req.body;

  const q = `
    INSERT INTO events (title, artists, dates, time, location)
    VALUES (?, ?, ?, ?, ?)
  `;

  connection.query(
    q,
    [title, artists, date, time, location],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Insert failed" });
      }
      // console.log(result);
      res.json({ message: "Event added successfully" });
      
    }
  );
});

app.get("/getEvents",(req,res)=>{

  let q="SELECT * FROM EVENTS ORDER BY DATES";
  connection.query(q,(err,result)=>{
    if (err) {
        console.error(err);
        return res.status(500).json({ error: "Extraction failed" });
      }
    else{
      // console.log(result);
      res.send(result);
    }
  })
})
// connection.end();
