import config from "../../lib/config"

const tmdb_base_url = config().tmdb_base_url
const headers = config().headers

export default async function tv(req,res) {
    const url = tmdb_base_url + '/tv/' + req.query.series + '/season/' + req.query.season
    const result = await fetch(url, {headers})
    const data = await result.json()
    res.status(200).json(
        data
    )
}