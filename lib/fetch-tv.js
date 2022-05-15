export async function loadtv(){
    const res = await fetch('http://localhost:3000/api/tv')
    const data = await res.json()
    return data
}