const api = process.env.TMDB_API_KEY
var base_url = process.env.TMDB_BASE_URL

const headers = {
    Authorization: 'Bearer ' + api,
    'Content-Type': 'application/json;charset=utf-8'
}

async function query(query) {
    const url = base_url + '/tv/' + query.season + '/season/1'
    console.log(url)
    const fetch_result = await fetch(url, {headers})
    const query_result  = await fetch_result.json()
    return query_result
}

export default async function tv(req,res) {
    const result = await query(req.query)
    res.status(200).json(
        result
    )
}