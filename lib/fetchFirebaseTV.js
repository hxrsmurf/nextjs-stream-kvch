export default async function fetchFirebaseTV() {
  const query = await fetch('http://localhost:3000/api/firebasetv')
  return await query.json()
}
