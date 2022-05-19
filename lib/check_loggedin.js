import { useEffect, useState } from "react"

export default function check_loggedin() {
    const [loggedIn,setLoggedIn] = useState()

    useEffect(() => {
        if (typeof window !== "undefined"){
            setLoggedIn(localStorage.getItem('token'))
        }
    }, [])

    return loggedIn
}
