const request = require('request')

const geocode = (address, callback) => {

    const urlG = ' https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibW9oYW1lZGhhc3NhbjExMjIzIiwiYSI6ImNrbDZhcWNzYzF0aXoydW80bzUwZDdpa2IifQ.-aALtK_LF2NqqMhy8x2cww&limit=1'

    request({
        url: urlG,
        json: true
    }, (error, response) => {

        if (error) {

            callback('Unable to connect to location services!', undefined)

        } else if (response.body.features.length === 0) {

            callback('Unable to find location. try again', undefined)

        } else {

            callback(undefined, {

                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name

            })


        }


    })
}


module.exports = geocode