/* Init Service */
const serviceConfig = require('./config');
const {Service, AppConfig} = require('@bhtbot/bhtbotservice');
const controller = require('./controller/weather');

const appConfig = new AppConfig();
appConfig.port = serviceConfig.port;

const app = new Service('WeatherService', appConfig);
app.endpoint('weather', controller);
app.start();