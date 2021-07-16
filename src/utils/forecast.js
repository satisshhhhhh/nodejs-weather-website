const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=c2870dc0123a1289168f00ef49a48cd0&query='+latitude+','+longitude

    request( {url:url, json:true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather Services :(', undefined)
        } else if (body.error){
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, {
                details: body.current.weather_descriptions + '. It is currently ' + body.current.temperature + "\u00B0 C, feels like "+ body.current.feelslike + "\u00B0 C",
                humidity: body.current.humidity,
                temperature: body.current.temperature,
                wind_speed: body.current.wind_speed
            })
        }
    })
}

module.exports = forecast

// http://api.weatherstack.com/current?access_key=c2870dc0123a1289168f00ef49a48cd0&query=71.0589,42.3601