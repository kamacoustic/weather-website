const path = require('path')
const express = require('express')
const { rawListeners } = require('process')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geoCode = require('./utils/geocode')

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
        title: 'Weather App',
        name: 'Morty Smith'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'My Sanic!',
        name: 'Amy Rose'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        hmessage: 'HELP ME! HOW DID I GET HERE?!',
        title: 'Help',
        name: 'Rick Sanchez'
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

            forecast(latitude, longitude, (error, forecastData) => {
                if(error){
                    return res.send({error})
                }

                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                })
            })
    })
    
})
    


app.get('/products', (req, res) => {
    if(!req.query.search){
       return res.send({
            error: 'Search term must be provided'
        })
    }

    res.send({
        products: []
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