const express = require('express')
const router = express.Router()
const weatherService = require('../services/weatherService')
const generatedMessage = require('../services/generateResponse')

router.post('/', async (req, res, next) => {

    let message = req.body

    console.log(message)

    let forToday = message.evaluatedMessage.forToday
    let weather
    let answerText
    if(forToday){
        weather = await weatherService.getForecast()
        answerText = await generatedMessage.generateForecastAnswer(
            weather
        )
    } else {
        weather = await weatherService.getFiveDayForecast()
        answerText = await generatedMessage.generateFiveDayForecastAnswer(weather)
    }

    message.answer = { content: answerText, history: 'WeatherService' }
    res.send(message)

})
module.exports = router