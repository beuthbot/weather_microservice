const axios = require('axios')
const apiKey = `8235a48444f166e19242ab0b22e7d1ce`
const NodeCache = require( "node-cache" );
const weatherCache = new NodeCache({stdTTL: 21600});

module.exports = {
    getForecast: async () => {
        forecast = weatherCache.get("today")
        console.log("CACHED: ",forecast)
        if(forecast == undefined){
            try {
                let forecastToday = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?q=Berlin,de&units=metric&lang=de&APPID=${apiKey}`
                )
                //console.log(forecastToday.data)
                weatherCache.set("today",forecastToday.data)
                return forecastToday.data
            } catch (error) {
                console.log(error)
            }
        } else {
            return forecast
        }

    },

    getFiveDayForecast: async () => {
        fiveDayForecast = weatherCache.get("fiveDays")
        console.log("CACHED: ",fiveDayForecast)
        if(fiveDayForecast == undefined){
            try {
                let forecastFiveDays = await axios.get(
                    `https://api.openweathermap.org/data/2.5/forecast?q=Berlin,de&units=metric&lang=de&APPID=${apiKey}`
                )
                //console.log(forecastFiveDays.data)
                weatherCache.set("fiveDays",forecastFiveDays.data)
                return forecastFiveDays.data
            } catch (error) {
                console.log(error)
            }
        } else {
            return fiveDayForecast
        }
    }
}