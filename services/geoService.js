const axios = require('axios')
const config = require('../config')

module.exports = {
    getCoordinates: async (query) => {
        // default data (fallback)
        let result = {
            lat: '52.5440958',
            lon: '13.3522725',
            display_name: 'Berlin, Deutschland',
            query
        }

        if(!query || typeof query !== 'string' || query.toLowerCase() === 'berlin') {
            return result
        }

        try {
            let url = `https://nominatim.openstreetmap.org/search?q=${encodeURI(query)}&format=json`
            // console.debug(url)

            let res = await axios.get(url)

            if(Array.isArray(res.data) && res.data.length > 0) {
                result = {...result, ...{
                    lat: res.data[0].lat,
                    lon: res.data[0].lon,
                    display_name: res.data[0].display_name
                }}
            } else {
                result = {...result, ...{ error: 'Data of nominatim API is missing' }}
            }

        } catch (error) {
            console.log(error)
            result = {...result, ...{ error }}
        }

        //console.log(result)

        return result
    }
}
