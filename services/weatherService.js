const axios = require('axios')
const config = require('../config')

module.exports = {
    getForecast: async (coords) => {
        try {
            let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&exclude=minutely&units=metric&lang=de&appid=${config.apiKey}`
            let forecast = await axios.get(url)

            return forecast.data
        } catch (error) {
            console.log(error)
        }
    },

    getHistory: async (coords, dateTime) => {
        try {
            let url = `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${coords.lat}&lon=${coords.lon}&dt=${dateTime}&units=metric&lang=de&appid=${config.apiKey}`
            let history = await axios.get(url)

            return history.data
        } catch (error) {
            console.log(error)
        }
    }
}
