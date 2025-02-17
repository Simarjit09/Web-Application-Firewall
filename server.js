/* 
express: our web server
body-parser: process form data and json data
helmet: add security headers
morgan: log http requests to help debug issues
*/

const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const morgan = require("morgan");
const waf = require("./waf"); //Import WAF middleware

const app = express ();
const PORT = 3000;

app.use(helmet());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(waf);

//Home Route
app.get("/", (req, res) => {
    res.send("Web Application Firewall (WAF) is running");
});


// Test route (to simulate attacks)
app.post("/test", (req, res) => {
    console.log(" Received a POST request to /test"); // Debug log
    res.send(" Your request passed the security check!");
});


//Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});


