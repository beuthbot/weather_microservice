// config.js
const dotenv = require('dotenv')
dotenv.config()
module.exports = {
    apiKey: process.env.WEATHER_API_KEY,
    port: process.env.WEATHER_SERVICE_PORT | 7000
}
