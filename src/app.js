const path = require("path");
const express = require("express");
const app = express();
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const viewsDirPath = path.join(__dirname, "..", "templates", "views");
const partialsDirPath = path.join(__dirname, "..", "templates", "partials");
const publicDirPath = path.join(__dirname, "..", "public");


app.set("view engine", "hbs");
app.set("views", viewsDirPath);
hbs.registerPartials(partialsDirPath);
app.use(express.static(publicDirPath));

app.get("/", (req, res) => {
   res.render("index", {
      title: "Welcome!", 
      name: "Oliver K" 
   });
});

app.get("/about", (req, res) => {
   res.render("about", {
      title: "About", 
      name: "Oliver K" 
   });
});

app.get("/help", (req, res) => {
    res.render("help", {
       title: "Help!", 
       helpMessage: "A super helpful message.", 
       name: "Oliver K" 
    });
});

app.get("/weather", (req, res) => {
    if(!req.query.address){
        return res.send({error: "You must specify an adress attribute!"});
    }
    
    geocode(req.query.address, (error, {longitude, latitude, location} = {}) => {
        if(error) {
            return res.send({error});
        }
        
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({error});
            }           
            
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });            
        });
        
    });
});

app.get("/products", (req, res) => {
    
    if(!req.query.search){
        return res.send({error: "You must specify a search term!"});
    }
    
    res.send([
        {search: req.query.search}    
    ]);
});

app.get("/help/*", (req, res) => {
    res.render("404", {
        errorMessage: "Help article not found!", 
        title: "Help 404", 
        name: "Oliver K"
    });
});

app.get("*", (req, res) => {
    res.render("404", {
        errorMessage: "Page not found!", 
        title: "404", 
        name: "Oliver K"       
    }); 
});


app.listen(process.env.PORT, console.log(`App running on port: ${process.env.PORT}`));

