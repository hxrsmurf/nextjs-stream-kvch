import { getFirebaseAdmin } from "next-firebase-auth"

export default async function firebaseusers(req, res) {
    const db = getFirebaseAdmin().firestore()
    const doc = await db.collection('users').get()
    const users = doc.docs.map((d)=> {
        return { ...d.data()}
    })
  return (
    res.status(200).json(users)
  )
}