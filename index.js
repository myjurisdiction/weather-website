const path = require('path');
const request = require('request');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const app = express();

const PORT = process.env.PORT || 5000;

// path to views
const viewsPath = path.join(__dirname, '/templates/views');

// path to public directory
const publicDirectoryPath = path.join(__dirname, '/public');

// partials path
const partialsPath = path.join(__dirname, 'templates/partials');

app.use(express.static(path.join(publicDirectoryPath)));
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.get('/', (req, res) => {
    res.render('weather');
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        res.send({
            error: 'please provide a location'
        })
    }
    else{
        geocode(req.query.address, (error, {latitude, longitude, place} = {})=> {
            if(error){
                return res.send({
                    error
                })
            }else{
                forecast(latitude, longitude, (error, { summary,timezone,temperatureHigh,temperature }) => {
                    if(error){
                        return res.send({
                            error
                        })
                    }
                    else{
                        res.send({
                            summary,
                            place,
                            timezone,
                            temperatureHigh,
                            temperature
                        })
                    }

                })
            }

        })
    }
})

app.listen(PORT, () => {
    console.log(`Server is listening at PORT: ${PORT}`);
});
