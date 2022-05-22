import { fetchFirebaseUsers } from "../lib/fetchFirebaseUsers"

export default async function checkFirebaseAdmin(user) {
    const authedUser = user.email
    const res = await fetchFirebaseUsers()
    const data = await res
    return data
}
