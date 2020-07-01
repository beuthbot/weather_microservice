const axios = require('axios')
const config = require('../config')

module.exports = {
    getForecast: async (coords) => {
        try {
            console.log(coords)

            let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&exclude=current,minutely,daily&units=metric&lang=de&appid=${config.apiKey}`
            //console.debug(url)

            let forecastToday = await axios.get(url)
            //console.log(forecastToday.data)

            return forecastToday.data
        } catch (error) {
            console.log(error)
        }
    },

    getFiveDayForecast: async (coords) => {
        try {
            console.log(coords)

            let url = `https://api.openweathermap.org/data/2.5/forecast?q=${coords.query}&units=metric&lang=de&APPID=${config.apiKey}`
            //console.debug(url)

            let forecastFiveDays = await axios.get(url)
            //console.log(forecastFiveDays.data)

            return forecastFiveDays.data
        } catch (error) {
            console.log(error)
        }
    }
}
