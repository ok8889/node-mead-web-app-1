const request = require("request");

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) +  ".json?access_token=pk.eyJ1Ijoib2xpdmVyazc4OSIsImEiOiJjanpsc2s1cTYwM21rM21teGwzYnk3aWthIn0.zH1vfvZs9LfoaF_hwAJpYQ"
    
    request({url, json: true}, (error, {body}) => {
        if (error) {
          callback("No connection could be established!", undefined);  
        } else if(body.features.length === 0) {
            callback("City could not be found!", undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    });
}

module.exports = geocode;