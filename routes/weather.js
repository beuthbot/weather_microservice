const express = require('express')
const router = express.Router()
const geoService = require('../services/geoService')
const weatherService = require('../services/weatherService')
const generatedMessage = require('../services/generateResponse')

router.post('/', async (req, res, next) => {

    let message = req.body.message
    let place = 'Berlin,de'; // placeholder (will be in the request as entity)

    let today = new Date().toISOString().split("T")[0]
    let tomorrow = new Date(today)
    let date = null
    let coordinates = null
    let weather = null
    let answerText = null

    tomorrow.setDate(tomorrow.getDate() + 1)

    message.entities.forEach(function (value, index, array) {
        if (value.entity == 'time') {
            date = new Date(value.value.split(".")[0])
        }
    })

    // console.log(`date:\t\t ${new Date(date)} / new Date: ${new Date(date).getTime()},
    //             today:\t\t ${new Date(today)} / new Date: ${new Date(today).getTime()},
    //             tomorrow:\t ${tomorrow} / new Date: ${new Date(tomorrow).getTime()}`)

    if (new Date(today) <= date && date < new Date(tomorrow)) {
        //console.log("Heute")
        coordinates = await geoService.getCoordinates(place)
        weather = await weatherService.getForecast(coordinates)
        answerText = await generatedMessage.generateForecastAnswer(weather, date)

    } else if (date >= new Date(tomorrow)) {
        //console.log("Morden oder später")
        coordinates = await geoService.getCoordinates(place)
        weather = await weatherService.getFiveDayForecast(coordinates)
        answerText = await generatedMessage.generateFiveDayForecastAnswer(weather, date.toJSON().split("T")[0])

    } else {
        //console.log("Gestern oder früher")
    }

    message.answer = { content: answerText, history: ['WeatherService'], parse_mode:"Markdown"}
    res.send(message)

})
module.exports = router
