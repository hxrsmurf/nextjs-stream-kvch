var base_url = process.env.base_url

export default async function handler(req, res) {
    //const result = await query()
    //const s = query(res.query)
    const query = res.query
    res.status(200).json({ name:  query })
}

async function query(series) {
    //console.log(series)
    const url = base_url + '/search/tv/?query=' + searchTerm
    const fetch_result = await fetch(url, {headers})
    const query_result  = await fetch_result.json()
    return query_result
}