import { AuthAction, useAuthUser, withAuthUser, getFirebaseAdmin } from "next-firebase-auth"
import { Container, Table } from "react-bootstrap"
import Loader from "../components/Loader"
import checkAuth from "../utils/checkAuth"
import initAuth from "../utils/initAuth"

initAuth()

export function admin({users}) {
  const AuthUser = useAuthUser()
  checkAuth(AuthUser)
  return (
    <>
        <Container className='mt-5'>
            Admin dashboard for {AuthUser.email}
            <p>
            <h1>Users</h1>
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>
                    Username
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                    <tr>
                      <td>
                      {user.user}
                      </td>
                    </tr>
                ))}
              </tbody>
            </Table>
            </p>
        </Container>
    </>
  )
}

export default withAuthUser({
    whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
    whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
    authPageURL: '/',
    LoaderComponent: Loader,
  })(admin)

export async function getServerSideProps() {
  const db = getFirebaseAdmin().firestore()
  const doc = await db.collection('users').get()
  return {
    props: {
      users: doc.docs.map((d)=> {
        return {...d.data(), key: d.id}
      }),
    },
  }
}