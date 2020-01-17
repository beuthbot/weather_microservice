const express = require('express')
const router = express.Router()
const weatherService = require('../services/weatherService')
const generatedMessage = require('../services/generateResponse')

router.post('/', async (req, res, next) => {

    let message = req.body

    let today = new Date().toISOString()
    let todaySplitted = today.split("T")
    today = todaySplitted[0]

    let date = message.evaluatedMessage.date
    if(date == undefined){
        date = new Date().toISOString()       
    }

    let dateSplitted = date.split("T")
    date = dateSplitted[0]

    let weather
    let answerText
    
    if(date === today){
        weather = await weatherService.getForecast()
        answerText = await generatedMessage.generateForecastAnswer(
            weather
        )
    } else {
        weather = await weatherService.getFiveDayForecast()
        answerText = await generatedMessage.generateFiveDayForecastAnswer(weather, date)
    }

    message.answer = { content: answerText, history: 'WeatherService' }
    res.send(message)

})
module.exports = router