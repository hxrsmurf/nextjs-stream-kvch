import tmdb from "./components/tmdb"

const api = process.env.TMDB_API_KEY

const base_url = 'https://api.themoviedb.org/3'
const headers = {
    Authorization: 'Bearer ' + api,
    'Content-Type': 'application/json;charset=utf-8'
}

const searchTerm = 'zoids'

async function query() {
    const fetch_result = await fetch(base_url + '/search/tv/?query=' + searchTerm, {headers})
    const query_result  = await fetch_result.json()
    return query_result
}

export default async function tv(req,res) {
    const result = await query()
    res.status(200).json(
        result
    )
}