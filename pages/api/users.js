export default function users(req, res) {
    const referrer = req.headers.referer.split('/')[3]
    const requestedUser = req.query.email
    var authorized = false

    if (referrer === 'tv') {
        var authorizedUsers = process.env.AUTHORIZED_USERS
    } else if (referrer === 'admin') {
        var authorizedUsers = process.env.ADMIN_USERS
    } else {
        var authorizedUsers = process.env.ADMIN_USERS
    }

    if (authorizedUsers.includes(requestedUser)){
        var authorized = true
    }

    res.status(200).json({'authorized': authorized})
}
