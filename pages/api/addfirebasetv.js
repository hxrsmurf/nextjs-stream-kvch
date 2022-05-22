import { getFirebaseAdmin } from "next-firebase-auth"

export default async function addfirebasetv(req, res) {
  console.log(req.query.name)

    const db = getFirebaseAdmin().firestore()
    const addData = await db.collection('tv').add({
      'name': req.query.name
    })

    res.status(200)
}
