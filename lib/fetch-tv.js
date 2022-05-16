export async function loadtv(id){
    const base_url = 'http://localhost:3000/api/tv/'

    if (id) {
        var url = base_url + id.episode
    } else {
        var url = base_url
    }

    const res = await fetch(url)
    const data = await res.json()
    return data
}