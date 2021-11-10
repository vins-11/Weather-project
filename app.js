const bodyParser = require("body-parser");
const express = require("express");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res){
    console.log("\nrequest body ->> ", req.body)

    const query = req.body.cityName;
    const apiKey = "3d016a6cfdb91422b75c81f94f7b26ba";
    const unit = "metric"

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
        
    https.get(url, function(response){
        console.log(response.statusCode);

         response.on("data", function(data){
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const des = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.write("<p>The Weather is currently " + des + "</p>");
            res.write("<h1>The Temprature in " + query + " is " + temp + " degrees celcius.</h1>");
            res.write("<img src="+ imageURL +">");
        })
        
    })

    
})


app.listen(3000, function(){
    console.log("Server is running on Port 3000.");
})