export default function users(req, res) {
   const authorizedUsers = process.env.AUTHORIZED_USERS
   const requestedUser = req.query.email
   var authorized = false

   if (authorizedUsers.includes(requestedUser)){
       var authorized = true
   }

   res.status(200).json({'authorized': authorized})
}
