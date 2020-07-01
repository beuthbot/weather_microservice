const axios = require('axios')
const config = require('../config')

module.exports = {
    getCoordinates: async (query) => {
        try {
            let url = `https://nominatim.openstreetmap.org/search?q=${query}&format=json`
            // console.debug(url)

            let place = await axios.get(url)[0]

            let result = {
                lat: place?.lat,
                lon: place?.lon,
                display_name: place?.display_name,
                query
            }

            return result
        } catch (error) {
            console.log(error)
        }
    }
}
