const request = require("request"); 

const forecast = (latitidue, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/c250024876742cd11d8ab4328944948b/${latitidue},${longitude}?lang=es&units=si`;
    
    request({url, json: true}, (error, {body}) => {
        if(error){
            callback("Could not reach the server!", undefined);
        } else if(body.error){
            callback("Unvalid geocoordinates!", undefined);
        } else{
            const {daily, currently} = body;
            const {summary} = daily.data[0];
            const {temperature, precipProbability} = currently;
            callback(undefined, {
                summary,
                temperature,
                precipProbability
            });
        }
    });
};

module.exports = forecast;
