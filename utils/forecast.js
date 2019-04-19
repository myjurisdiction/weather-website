const request = require('request');
const celcius = require('../celcius.js');





const forecast = (latitude, longitude, callback) => {
    const url = "https://api.darksky.net/forecast/dd67f5c2047bb8a238a0cc937ca9ccc1/" + latitude + "," + longitude;
    request({ url, json: true }, (error, { body }) => {
      
        if(error){
            callback("oops!! connection failed", undefined);
        }else if(body.error){
            callback('please specify the correct latitude and longitude', undefined);
            console.log(body.error);
        }
        else{
            const temperature = celcius(body.currently.temperature)
            const temperatureHigh = celcius(body.daily.data[0].temperatureHigh)
            callback(undefined, {
                // latitude: body.latitude,
                // longitude: body.longitude,
                summary: body.currently.summary,
                timezone: body.timezone,
                temperature,
                temperatureHigh
            });

        }
    });
};

// forecast(-75.7088, 44.1545, (error, data) => {
//     console.log('Error: ', error);
//     console.log('Data: ', data);
// })

module.exports = forecast;
    