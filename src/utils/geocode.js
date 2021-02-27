const request = require('postman-request')



const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address + '.json?access_token=pk.eyJ1Ijoia2FtYWNvdXN0aWMiLCJhIjoiY2trZG4weTF1MDF6ZzJvcW1yM2p5aWRhNCJ9.-nMbXut88JrH3XWkqkoXYg&limit=1'


    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to location services!', undefined)
        }else if(body.features.length < 1){
            callback('No match found', undefined)
        }else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}



module.exports = geoCode