module.exports = {
    generateForecastAnswer: async (weather, date) => {
        // empty message text that has to be filled and parsed
        const country = 'Berlin';
        const weatherFromHour = weather.hourly.filter(hours => hours.dt == new Date(date).getTime()/1000)[0]
        const daysOfWeek = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag']
        const weatherDescription = weatherFromHour.weather[0].description
        const weatherTemp = Math.round(weatherFromHour.temp)
        const weatherTime = date.getHours()
        const weatherDay = daysOfWeek[date.getDay()-1]
        
        let messageText =   `${country}\n` +
                            `${weatherTime} Uhr\t🌧 ${weatherTemp}°\n` +  
                            `${weatherDay}\t\t*23* 18\n`;


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
