const express = require('express')
const router = express.Router()
const geoService = require('../services/geoService')
const weatherService = require('../services/weatherService')
const generatedMessage = require('../services/generateResponse')

router.post('/', async (req, res, next) => {

    let message = req.body.message

    let timeNow = new Date()
    let tomorrow = new Date(timeNow.toJSON().split("T")[0])
    let date = timeNow
    let place = 'berlin'
    let coordinates = null
    let weather = null
    let answerText = null

    tomorrow.setDate(tomorrow.getDate() + 1)

    place = message.entities
        .filter(e => e.entity === 'city')
        .reduce((prev, now) => (prev.confidence >= now.confidence) ? prev : now, { value: 'berlin' })
        .value;

    message.entities.forEach(function (value, index, array) {
        if (value.entity == 'time') {
            date = new Date(value.value.split(".")[0])
        } //TODO: Error massege if time 60h
    })

    console.log(`
                    date:\t ${new Date(date)} / new Date: ${new Date(date).getTime()},
                    timeNow:\t ${new Date(timeNow)} / new Date: ${new Date(timeNow).getTime()},
                    tomorrow:\t ${tomorrow} / new Date: ${new Date(tomorrow).getTime()}`)

    if (new Date(timeNow) <= date && date < new Date(tomorrow)) {
        //TODO: range up to 48h
        console.log("Heute")
        coordinates = await geoService.getCoordinates(place)
        weather = await weatherService.getForecast(coordinates)
        answerText = await generatedMessage.generateForecastAnswer(weather, date)

    } else if (date >= new Date(tomorrow)) {
        console.log("Morden oder später")
        coordinates = await geoService.getCoordinates(place)
        weather = await weatherService.getFiveDayForecast(coordinates)
        answerText = await generatedMessage.generateFiveDayForecastAnswer(weather, date.toJSON().split("T")[0])

    } else {
        console.log("Gestern oder früher")
    }

    message.answer = { content: answerText, history: ['WeatherService'], parse_mode:"Markdown"}
    res.send(message)

})
module.exports = router
