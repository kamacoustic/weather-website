// const url = 'http://api.weatherstack.com/current?access_key=5406b60c6be7ef0a0549257641dcd632&query=37.8267,-122.4233&units=f'

// request({ url: url, json: true}, (error, response) => {
//     if(error){
//         console.log('Unable to connect to weather service')
//     }else if(response.body.error){
//         console.log('Unable to find location')
//     } else{
//         console.log(response.body.current.weather_descriptions[0] + `. It is currently ${response.body.current.temperature} degrees out. There is a ${response.body.current.precip}% chance of rain`)
//     }
    
// })
const request = require('postman-request')

const currentForecast = (lon, lat, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=5406b60c6be7ef0a0549257641dcd632&query=' + lon +',' + lat + ',&units=f'

    request({url, json: true}, (error, {body}) =>{
        if(error){
            callback('Unable to connect', undefined)
        } else if(body.error){
            callback('Unable to find location', undefined)
        } else{
            // callback(undefined, body.current.weather_descriptions[0] + `. It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike}. With a humidity of ${body.current.humidity}%, there is a ${body.current.precip}% chance of rain.`)
                callback(undefined, body)
        }
    })

}










module.exports = currentForecast