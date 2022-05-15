import tmdb from "./components/tmdb"

const tv_ids = [37419]

export default async function tv(req,res) {
    const api = process.env.TMDB_API_KEY

    const base_url = 'https://api.themoviedb.org/3'
    const image_url = 'https://image.tmdb.org/t/p/w500'
    const headers = {
        Authorization: 'Bearer ' + api,
        'Content-Type': 'application/json;charset=utf-8'
    }

    const response_tv  = await fetch(base_url + '/tv/' + tv_ids, {headers})
    const result_tv = await response_tv.json()
    const result_tv_poster = image_url + result_tv.poster_path

    const episodes = []
    for (const s of result_tv.seasons){
        const url = base_url + '/tv/' + tv_ids + '/season/' + s.season_number
        const response_season = await fetch(url, {headers})
        const result_season = await response_season.json()
        episodes.push(result_season)
    }

    res.status(200).json(
        {
            result_tv_poster,
            episodes
        }
    )
}