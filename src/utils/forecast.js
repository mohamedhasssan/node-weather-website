const request = require('request')



const forecast = (latitude, longitude, callback) => {

    const urlF = 'http://api.weatherstack.com/current?access_key=2f56922a84ae473df93a525ab49a2def&query=' + latitude + ',' + longitude + '&units=m'

    request({

        url: urlF,
        json: true

    }, (error, response) => {

        if (error) {

            callback('could not connect to weather data')


        } else if (response.body.error) {
            callback('unable to find the location')
        } else {

            callback(undefined, {description: response.body.current.weather_descriptions[0], temperature: response.body.current.temperature, feels: response.body.current.feelslike})


        }


    })


}


module.exports = forecast
