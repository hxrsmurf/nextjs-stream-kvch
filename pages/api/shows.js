const apiKey = process.env.TMDB_API_KEY
const apiURL = process.env.TMDB_BASE_URL
const headers = {
    Authorization: 'Bearer ' + apiKey,
    'Content-Type': 'application/json;charset=utf-8'
}

export default async function shows(req,res) {
    if (req.query){
        const searchURL = apiURL + '/search/tv?query=' + req.query.show
        console.log(searchURL)
        const fetch_result = await fetch(searchURL, {headers})
        const query_result  = await fetch_result.json()
        res.status(200).json(query_result)
    }
}