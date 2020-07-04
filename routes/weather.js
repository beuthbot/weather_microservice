const express = require('express')
const router = express.Router()
const geoService = require('../services/geoService')
const weatherService = require('../services/weatherService')
const generatedMessage = require('../services/generateResponse')

router.post('/', async (req, res, next) => {

    const message = req.body.message
    const timeNow = new Date()
    const twoDaysInFuture = new Date(timeNow.getTime() + 169200000) //set time 47 hours in future
    let date = timeNow
    let place = null
    let coordinates = null
    let weather = null
    let answerText = null

    place = message.entities
        .filter(e => e.entity === 'city')
        .reduce((prev, now) => (prev.confidence >= now.confidence) ? prev : now, { value: 'berlin' })
        .value;

    message.entities.forEach(time => {
        if (time.entity == 'time') {
            date = new Date(time.value)
            console.log(`Date: ${date}`)
        }
    })

    // console.log(`
    //                 date:\t\t ${date} / new Date: ${date.getTime()},
    //                 timeNow:\t\t ${timeNow} / new Date: ${timeNow.getTime()},
    //                 twoDaysInFuture:\t ${twoDaysInFuture} / new Date: ${twoDaysInFuture.getTime()}`)

    coordinates = await geoService.getCoordinates(place)
    city = coordinates.display_name.split(",")[0]

    if (timeNow <= date && date < twoDaysInFuture) {
        //lower then two days call
        weather = await weatherService.getForecast(coordinates)
        answerText = await generatedMessage.generateTwoDayforecastAnswer(weather, date, city)

    } else if (date >= twoDaysInFuture) {
        //higher then two days call
        weather = await weatherService.getForecast(coordinates)
        answerText = await generatedMessage.generateSevenDayForecastAnswer(weather, date, city)

    } else {
        //history Call
        weather = await weatherService.getHistory(coordinates, date.getTime()/1000)
        answerText = await generatedMessage.generateWeatherHistoryAnswer(weather, date, city)
    }

    message.answer = { content: answerText, history: ['WeatherService'], parse_mode: "Markdown" }
    res.send(message)

})
module.exports = router
