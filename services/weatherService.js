const axios = require('axios')
const config = require('../config')

module.exports = {
    getForecast: async () => {
        try {
            let url = `https://api.openweathermap.org/data/2.5/onecall?lat=52.544500&lon=13.353260&exclude=current,minutely,daily&units=metric&lang=de&appid=${config.apiKey}`
            //console.debug(url)

            let forecastToday = await axios.get(url)
            //console.log(forecastToday.data)

            return forecastToday.data
        } catch (error) {
            console.log(error)
        }
    },

    getFiveDayForecast: async () => {
        try {
            let url = `https://api.openweathermap.org/data/2.5/forecast?q=Berlin,de&units=metric&lang=de&APPID=${config.apiKey}`
            //console.debug(url)

            let forecastFiveDays = await axios.get(url)
            //console.log(forecastFiveDays.data)

            return forecastFiveDays.data
        } catch (error) {
            console.log(error)
        }
    }
}
