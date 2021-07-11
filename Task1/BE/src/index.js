const express = require('express')
const cors = require('cors')
const axios = require('axios')
const app = express()
const port = 3000

app.use(cors())

app.get('/:artist', (req, res) => {
    var artist = req.params.artist.replace(" ", "+")
    return axios({
        method: "GET",
        url: `https://itunes.apple.com/search?term=${artist}&entity=album&output=json&limit=200`
    })
        .then(response => {
            var obj = {}
            response.data.results.forEach(element => {
                if (!obj[element.collectionName]) {
                    obj[element.collectionName] = {
                        album: element.collectionName,
                        artist: element.artistName,
                        artworkUrl60: element.artworkUrl60,
                        artworkUrl100: element.artworkUrl100,
                        trackCount: element.trackCount
                    }
                }
            });
            res.send(
                Object.keys(obj).map(k => obj[k])
            )
        })
        .catch(error => {
            console.warn(error)
            res.send(error)
        })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})