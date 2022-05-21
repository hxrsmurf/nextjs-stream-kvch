import Loader from "../components/Loader"

export default async function checkAuth(user) {
    var url = process.env.NEXT_PUBLIC_API_URL + '/users?email=' + user.email
    const res = await fetch(url)
    const data = await res.json()

    if (!data.authorized === true) {
        location.replace('/')
    }
    return Loader
}
