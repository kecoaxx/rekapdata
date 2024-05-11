const express = require('express');
const app = express();
const con = require("./controller");
const http = require('http');
const path = require("path");
const server = http.createServer(app);

const blokRekapjson = "../data/blokRekap.json";
const matkulRekapjson = "../data/matkulRekap.json";
const blokRekapData = con.readJSON(path.join(__dirname, blokRekapjson));
const matkulRekapData = con.readJSON(path.join(__dirname, matkulRekapjson));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../front"));

app.route("/").get((req, res) => {
    res.redirect("/rekapdata");
}) 

app.route("/rekapdata")
  .get( (req, res) => {
    res.render('rekap',{
      Blok: blokRekapData,
      Matkul: matkulRekapData,
    })
  })

app.use((req, res) => {
    res.status(404).render("err404");
});

app.use(express.static(path.join(__dirname, "../front")));

  server.listen("3000", `${con.getWifiLocalIpAddress()}`, () => {
    console.log(`Server is running at ${con.getWifiLocalIpAddress()}:3000`);
  });
  