const path = require('path')
const express = require('express')
const { rawListeners } = require('process')
const hbs = require('hbs')
const currentForecast = require('./utils/forecast')
const geoCode = require('./utils/geocode')
const { brotliDecompressSync } = require('zlib')

const app = express()
const port = process.env.PORT || 3000


// Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Here & Now',
        name: 'The Mojo Works'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Hello there!',
        name: 'The Mojo Works'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        hmessage: 'If you receive an error message, please try your location again',
        title: 'Help',
        name: 'The Mojo Works'
    })
})


//app.com/weather
app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Address must be provided'
        })
    }

    geoCode(req.query.address, (error, {latitude, longitude, location} = {}) =>{
            if(error){
                return res.send({error})
            }

            currentForecast(latitude, longitude, (error, forecastData) => {
                if(error){
                    return res.send({error})
                }

                res.send({
                    forecast: forecastData.current.weather_descriptions[0] + `. It is currently ${forecastData.current.temperature} degrees out. It feels like ${forecastData.current.feelslike}. Humidity ${forecastData.current.humidity}%;`,
                    location,
                    address: req.query.address,
                    icon: forecastData.current.weather_icons[0],
                    time: forecastData.current.observation_time
                })
                
            })
    })
    
})
    



app.get('/help/*', (req, res) => {
    res.render('fourohfour', {
        helpMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('fourohfour', {
        pageMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})