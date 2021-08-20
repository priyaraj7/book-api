// let express = require("express");
// let app = express();

// // app.get("/", function (req, res) {
// //   res.send("Hello World");
// // });

// // let server = app.listen(8081, function () {
// //   let host = server.address().address;
// //   let port = server.address().port;

// //   console.log("Example app listening at http://%s:%s", host, port);
// // });

// // This responds with "Hello World" on the homepage
// app.get("/", function (req, res) {
//   console.log("Got a GET request for the homepage");
//   res.send("Hello GET");
// });

// // This responds a POST request for the homepage
// app.post("/", function (req, res) {
//   console.log("Got a POST request for the homepage");
//   res.send("Hello POST");
// });

// // This responds a DELETE request for the /del_user page.
// app.delete("/del_user", function (req, res) {
//   console.log("Got a DELETE request for /del_user");
//   res.send("Hello DELETE");
// });

// // This responds a GET request for the /list_user page.
// app.get("/list_user", function (req, res) {
//   console.log("Got a GET request for /list_user");
//   res.send("Page Listing");
// });

// // This responds a GET request for abcd, abxcd, ab123cd, and so on
// app.get("/ab*cd", function (req, res) {
//   console.log("Got a GET request for /ab*cd");
//   res.send("Page Pattern Match");
// });

// var server = app.listen(8081, function () {
//   var host = server.address().address;
//   var port = server.address().port;

//   console.log("Example app listening at http://%s:%s", host, port);
// });

// var express = require("express");
// var app = express();

// app.use(express.static("public"));
// app.get("/index.html", function (req, res) {
//   res.sendFile(__dirname + "/" + "index.html");
// });

// // get method

// var server = app.listen(8081, function () {
//   var host = server.address().address;
//   var port = server.address().port;

//   console.log("Example app listening at http://%s:%s", host, port);
// });

var express = require("express");
var app = express();
var bodyParser = require("body-parser");

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const ejs = require("ejs");

const books = [];
app.use(express.static("public"));
app.get("/index.htm", function (req, res) {
  ejs.renderFile(__dirname + "/" + "index.html.ejs", { books }, (err, str) => {
    res.send(str);
  });
});
// get request

app.get("/search", function (req, res) {
  // Prepare output in JSON format
  const searchTerm = req.query.query;
  const response = books.filter(
    (b) => b.title && b.title.indexOf(searchTerm) !== -1
  );
  console.log(response);
  res.end(JSON.stringify(response));
});

app.post("/add", urlencodedParser, function (req, res) {
  // Prepare output in JSON format
  books.push(req.body);

  console.log(res);
  res.end(
    JSON.stringify({
      status: "success",
      message: `Book ${req.body.title} was added`,
    })
  );
});

var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log("Example app listening at http://%s:%s", host, port);
});
