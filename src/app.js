const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')



const app = express()


//Define path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')


//Setup handlbars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)


//Setup static directory to serve
app.use(express.static(publicDirectoryPath))
app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'Prabhat Chand'
    })
})


app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About Me',
        name: 'Prabhat Chand'
    })
})


app.get('/help',(req,res) => {
    res.render('help',{
        message: 'Help me!',
        title: 'Help',
        name: 'Prabhat Chand'
    })
})


app.get('/weather',(req,res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address!'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })


        })
    })
})


app.get('/help/*', (req,res) => {
    res.render('404',{
        title: '404',
        name: 'Prabhat',
        errorMessage: 'Help Page not found'
    })
})


app.get('*', (req,res) => {
    res.render('404',{
        title: '404',
        name: 'Prabhat',
        errorMessage: 'Page not found'
    })
})
// app.com
// app.com/help 
// app.com/about


app.listen(3000,()=>{
    console.log('Server is running at Port 3000')
})
