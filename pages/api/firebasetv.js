import { getFirebaseAdmin } from "next-firebase-auth"

export default async function firebasetv(req, res) {
    const db = getFirebaseAdmin().firestore()
    const doc = await db.collection('tv').get()
    const tv = doc.docs.map((d)=> {
        return { ...d.data()}
    })
  return (
    res.status(200).json(tv)
  )
}