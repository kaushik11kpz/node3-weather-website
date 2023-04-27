const request = require('postman-request')


// GeoCoding
// Address -> Lat/Long 
const geocode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoia2F1c2hpazExa3B6IiwiYSI6ImNsZzF4b2g3aTAwMTIzam8wY2dzczl0dDMifQ.3JkRYxxzeIby9Jh5LrZWyQ&limit=1'
    request({url, json: true},(error,{body}={}) => {
        if(error){
            callback('Unable to connect to geo services!',undefined)
        }else if(body.features.length === 0){
            callback('Unable to find location. Try another search',undefined)
        }else{
            callback(undefined,{
                    latitude : body.features[0].center[1],
                    longitude : body.features[0].center[0],
                    location : body.features[0].place_name
            })
        }
    })
  }


  module.exports = geocode
