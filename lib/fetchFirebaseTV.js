export async function fetchFirebaseTV(){
    const base_url = 'http://localhost:3000/api/firebasetv/'

    const res = await fetch(base_url)
    const data = await res.json()
    return data
}