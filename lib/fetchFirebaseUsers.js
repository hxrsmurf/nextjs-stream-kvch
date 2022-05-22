export async function fetchFirebaseUsers(){
    const base_url = 'http://localhost:3000/api/firebaseusers/'

    const res = await fetch(base_url)
    const data = await res.json()
    return data
}