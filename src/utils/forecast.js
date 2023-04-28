const request = require('postman-request')


const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=8bbaf67f8bf5985d28d68a118fe1df79&query=' + latitude + ',' + longitude + '&units=f'
    request({url, json: true},(error, {body}) => {
        if(error){
           callback('Unable to connect to weather service!',undefined)
        }else if(body.error){
            callback('Unable to find location. Please try with different coordinates!')
        }else{
            callback(undefined, body.current.weather_descriptions[0]+'. It is currently '+ (body.current.temperature-32)*5/9 + ' degree celsius out.' + 
            ' The humidity is '+body.current.humidity+', '+'windspeed is '+body.current.wind_speed*1.825 + ' km/h. and the visibilty is '+body.current.visibility + ' meters.'
            + ' The location is ' + body.location.lat + ' latitude and ' + body.location.lon + ' longitude')
        }
    })
}


module.exports = forecast
