module.exports = {
    generateForecastAnswer: async weather => {
        // empty message text that has to be filled and parsed
        let messageText = ''

        messageText = 'Hey, das Wetter in Berlin sieht heute wie folgt aus: \n\n'

        messageText +=
            '\n' +
            'Beschreibung: ' + weather.weather[0].description +
            '\n' +
            'Temperatur: ' + weather.main.temp + '°C' +
            '\n' + 
            'Fühlt sich an wie: ' + weather.main.feels_like + '°C' +
            '\n' + 
            'Niedrigste Temperatur: ' + weather.main.temp_min + '°C' +
            '\n' + 
            'Höchste Temperatur: ' + weather.main.temp_max + '°C' +
            '\n' + 
            'Luftfeuchtigkeit: ' + weather.main.humidity + '%' +
            '\n' +
            'Windgeschwindigkeit: ' + weather.wind.speed + 'm/s'

        return messageText
    },

    generateFiveDayForecastAnswer: async weather => {
         // empty message text that has to be filled and parsed
         let messageText = ''

         messageText = 'Hey, das Wetter in Berlin sieht in den nächsten Tagen wie folgt aus: \n\n'
        for(i = 0; i < weather.list.length; i += 2){

            forecast = weather.list[i]

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
         /*weather.list.forEach(forecast => {
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

         })*/
         
        return messageText
    }
}
