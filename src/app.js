const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const { defaultMaxListeners } = require('events')

const app = express()
const port = process.env.PORT || 3000

//Define path for Express config.. {nodemon src/app.js -e js,hbs
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Satish'
    })
})

// app.get('/about', (req, res) => {
//     res.render('about', {
//         title: 'About Me',
//         name: 'Satya'
//     })
// })

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: "This is some helpful text.",
        title: "Help",
        name: "Satish"
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData.details,
                location,
                address: req.query.address,
                humidity: forecastData.humidity,
                temperature: forecastData.temperature,
                wind_speed: forecastData.wind_speed,
            })
            
        })
    })
})



app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Satya',
        errorMessage: 'Help Article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Satya',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+ port)
}) //Starts the server