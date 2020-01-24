const express = require('express')
const router = express.Router()
const weatherService = require('../services/weatherService')
const generatedMessage = require('../services/generateResponse')

router.post('/', async (req, res, next) => {

    let message = req.body.message

    let today = new Date().toISOString().split("T")[0]
    let date = new Date().toISOString().split("T")[0]

    message.entities.forEach(function(value, index, array) {
        if (value.entity == 'time') {
            date = value.value.split("T")[0]
        }
    })

    console.log("today: "+ today)
    console.log("date: " + date)

    let weather
    let answerText
    
    if(new Date(date) <= new Date(today)){
	console.log("today is the day")
        weather = await weatherService.getForecast()
        answerText = await generatedMessage.generateForecastAnswer(
            weather
        )
    } else {
	console.log("five days")
        weather = await weatherService.getFiveDayForecast()
        answerText = await generatedMessage.generateFiveDayForecastAnswer(weather, date)
    }

    message.answer = { content: answerText, history: ['WeatherService'] }
    res.send(message)

})
module.exports = router
