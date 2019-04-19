const request = require('request');

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?access_token=pk.eyJ1IjoibXlqdXJpc2RpY3Rpb24iLCJhIjoiY2p1Zmwzc2MwMGVlNTN5cHFpZmpzZ2d0dSJ9.e49cxyQtL7pVqtEgzyJnBQ&limit=1";
    request({ url: url, json: true }, (error, { body }) => {
        if(error){
            callback("oops!!, connection failed", undefined);
        }else if(body.features.length === 0){
            callback("unable to find the place you are looking for..", undefined);
        }else{
            // console.log(`${response.body.features[2].place_name}, latitude: ${response.body.features.center[0]}, longitude: ${response.body.features.center[0]}`);
            callback(undefined, {
                place: body.features[0].place_name,
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0]

            })
        }
    })
}


// geocode('Sitamarhi', (error, data) => {
//     console.log('error', error);
//     console.log('Data', data);
// })


module.exports = geocode;