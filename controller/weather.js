const geoService = require('../services/geoService')
const weatherService = require('../services/weatherService')
const generatedMessage = require('../services/generateResponse')

module.exports = async (gatewayRequest, answer) => {

    const timeNow = new Date()
    const twoDaysInFuture = new Date(timeNow.getTime() + 169200000) //set time 47 hours in future
    let date = timeNow
    let place = null
    let coordinates = null
    let weather = null
    let answerText = null
    let timeSpecification = true


    place = gatewayRequest.entities
        .filter(e => e.entity === 'city')
        .reduce((prev, now) => (prev.confidence >= now.confidence) ? prev : now, { })
        .value;

    if(typeof place !== 'string') {
        if(gatewayRequest.user && gatewayRequest.user.details && gatewayRequest.user.details.home) {
            place = gatewayRequest.user.details.home
        } else {
            place = 'berlin'
        }
    }

    coordinates = await geoService.getCoordinates(place)

    gatewayRequest.entities.forEach(time => {
        if (time.entity === 'time') {
            date = new Date(time.value)
            if (date.getHours() == 0 && time.text.toString().search("0") == -1) {
                timeSpecification = false
            }
        }
    })

    if (date > new Date(timeNow.getTime() + 604800000)) {
        answer.content = "Du kannst nur maximal 7 Tage in die Zukunft nach dem Wetter fragen."

    } else if (date < new Date(timeNow.getTime() - 432000000)) {
        answer.content = "Du kannst nur maximal 5 Tage in die Vergangenheit nach dem Wetter fragen."

    } else if (coordinates.error) {
        answer.content = 'Der Ort konnte nicht gefunden werden.\nBitte versuchen sie eine andere Schreibweise.'

    } else {
        city = coordinates.display_name.split(",")[0]

        if (timeNow <= date && date < twoDaysInFuture && timeSpecification === true) {
            //up to 47 hours into the future
            weather = await weatherService.getForecast(coordinates)
            answerText = await generatedMessage.generateTwoDayforecastAnswer(weather, date, city)

        } else if (date >= twoDaysInFuture || (date.getDate() >= timeNow.getDate() && timeSpecification === false)) {
            //higher then two days into the future or no time specification call
            weather = await weatherService.getForecast(coordinates)
            answerText = await generatedMessage.generateSevenDayForecastAnswer(weather, date, city)

        } else {
            //history Call
            weather = await weatherService.getHistory(coordinates, date.getTime() / 1000)
            answerText = await generatedMessage.generateWeatherHistoryAnswer(weather, date, city)
        }

        answer.content = answerText
    }

    return answer;
}