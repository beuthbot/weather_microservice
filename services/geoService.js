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

            let res = await axios.get(url)

            if(Array.isArray(res.data) && res.data.length > 0) {
                result = {...result, ...{
                    lat: res.data[0].lat,
                    lon: res.data[0].lon,
                    display_name: res.data[0].display_name
                }}
            }

            return result
        } catch (error) {
            console.log(error)
        }
    }
}
