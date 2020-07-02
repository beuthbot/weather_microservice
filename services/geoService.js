const axios = require('axios')
const config = require('../config')

module.exports = {
    getCoordinates: async (query) => {
        try {
            let result = {
                lat: null,
                lon: null,
                display_name: null,
                query
            }

            let url = `https://nominatim.openstreetmap.org/search?q=${query}&format=json`
            // console.debug(url)

            let places = await axios.get(url)

            if(Array.isArray(places) && places.length > 0) {
                result = {...result, ...{
                    lat: places[0].lat,
                    lon: places[0].lon,
                    display_name: places[0].display_name
                }}
            }

            return result
        } catch (error) {
            console.log(error)
        }
    }
}
