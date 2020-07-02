const getdayOfWeek = function (date) {
    const daysOfWeek = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag']
    return daysOfWeek[date.getDay() - 1]
}

const getWeatherIcon = function (weatherFromHour) {
    const icon = weatherFromHour.weather[0].icon.substring(0, 2)
    const weatherIcons = {
        "01": "☀️",
        "02": "⛅",
        "03": "☁️",
        "04": "☁️",
        "09": "🌧️",
        "10": "🌦️",
        "11": "🌩️",
        "13": "❄️",
        "50": "🌫️"
    }

    return weatherIcons[icon]
}

const setTimeWithHour = function (date) {
    date.setMinutes(0)
    date.setSeconds(0)
    date.setMilliseconds(0)
}

const getAllDayObjects = function (weather, date) {
    const dateWithoutTime = date.toJSON().split("T")[0]
    weather.daily.forEach((day, index) => {
        if(dateWithoutTime === new Date(day.dt*1000).toJSON().split("T")[0]){
            weather = day
        }
    })
    return weather
}

module.exports = {
    generateForecastAnswer: async (weather, date) => {
        setTimeWithHour(date)

        const country = 'Berlin';
        const weatherWithHourly = weather.hourly.filter(hours => hours.dt == new Date(date).getTime() / 1000)[0]
        const weatherWithDaily = getAllDayObjects(weather, date)
        const daysOfWeek = getdayOfWeek(date)
        const weatherIcon = getWeatherIcon(weatherWithHourly)
        const weatherTemp = Math.round(weatherWithHourly.temp)
        const weatherTime = date.getHours()
        const weatherTempMax = Math.round(weatherWithDaily.temp.max)
        const weatherTempMin = Math.round(weatherWithDaily.temp.min)

        let messageText = `${country}\n` +
            `${weatherTime} Uhr\t${weatherIcon} ${weatherTemp}°\n` +
            `${daysOfWeek}\t\t*${weatherTempMax}* ${weatherTempMin}\n`;


        return messageText
    },

    generateFiveDayForecastAnswer: async (weather, date) => {
        // empty message text that has to be filled and parsed

        let messageText = ''

        messageText = 'Hey, das Wetter in Berlin sieht am ' + date + ' wie folgt aus: \n\n'

        weather.list.forEach(forecast => {
            forecastDate = forecast.dt_txt.split(" ")
            forecastDay = forecastDate[0]
            if (forecastDay === date) {
                messageText +=
                    '\n' +
                    'Tag und Uhrzeit: ' + forecast.dt_txt +
                    '\n' +
                    'Beschreibung: ' + forecast.weather[0].description +
                    '\n' +
                    'Temperatur: ' + forecast.main.temp +
                    '\n' +
                    'Luftfeuchtigkeit: ' + forecast.main.humidity + '%' +
                    '\n' +
                    'Windgeschwindigkeit: ' + forecast.wind.speed + 'm/s'
            }
        })

        return messageText
    }
}
