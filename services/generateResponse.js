const getDayName = function (date) {
    const daysOfWeek = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag']
    return daysOfWeek[date.getDay()]
}

const getWeatherIcon = function (weatherFromHour) {
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
    const iconKey = weatherFromHour.weather[0].icon.substring(0, 2)
    return weatherIcons[iconKey]
}

const getDay = function (weather, date) {
    weather.daily.forEach(day => {
        if (date.toDateString() === new Date(day.dt * 1000).toDateString()) {
            weather = day
        }
    })
    return weather
}

const getHourly = function (weather, date) {
    weather.hourly.filter(hour => {
        if (date.toDateString() === new Date(hour.dt * 1000).toDateString() && new Date(hour.dt * 1000).getHours() === date.getHours()) {
            weather = hour
        }
    })
    return weather
}

const getCurrent = function (weather) {
    return weather.current
}

module.exports = {
    generateTwoDayforecastAnswer: async (weather, date, city) => {
        const weatherHourly = getHourly(weather, date)
        const weatherDaily = getDay(weather, date)
        const dayName = getDayName(date)
        const weatherTime = date.getHours()

        const weatherIcon = getWeatherIcon(weatherHourly)
        const weatherTemp = Math.round(weatherHourly.temp)
        const weatherTempMax = Math.round(weatherDaily.temp.max)
        const weatherTempMin = Math.round(weatherDaily.temp.min)

        let messageText =
            `${city}\n` +
            `${weatherTime}h   ${weatherIcon} ${weatherTemp}°\n` +
            `${dayName}   *${weatherTempMax}°* / ${weatherTempMin}°`;


        return messageText
    },

    generateSevenDayForecastAnswer: async (weather, date, city) => {
        const weatherDaily = getDay(weather, date)
        const dayName = getDayName(date)

        const weatherIcon = getWeatherIcon(weatherDaily)
        const weatherTempMax = Math.round(weatherDaily.temp.max)
        const weatherTempMin = Math.round(weatherDaily.temp.min)

        let messageText =
            `${city}\n` +
            `${dayName}   ${weatherIcon} *${weatherTempMax}°* / ${weatherTempMin}°`;


        return messageText
    },

    generateWeatherHistoryAnswer: async (weather, date, city) => {
        const weatherCurrent = getCurrent(weather)
        const dayName = getDayName(date)
        const weatherTime = date.getHours()

        const weatherIcon = getWeatherIcon(weatherCurrent)
        const weatherTemp = Math.round(weatherCurrent.temp)

        let messageText =
            `${city}\n` +
            `${weatherTime}h ${dayName}   ${weatherIcon} ${weatherTemp}°`;


        return messageText
    },
}
