export async function addFirebaseTV(data){
    const base_url = 'http://localhost:3000/api/addfirebasetv?name=' + data
    const result = await fetch(base_url)
    const r = await res.json()
}