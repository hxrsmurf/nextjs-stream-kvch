import { AuthAction, useAuthUser, withAuthUser, getFirebaseAdmin } from "next-firebase-auth"
import { Container, Table } from "react-bootstrap"
import Loader from "../components/Loader"
import checkAuth from "../utils/checkAuth"
import initAuth from "../utils/initAuth"

import { fetchFirebaseUsers } from "../lib/fetchFirebaseUsers"

initAuth()

export function admin({users}) {
  const AuthUser = useAuthUser()
  checkAuth(AuthUser)

  return (
    <>
        <Container className='mt-5'>
            Admin dashboard for {AuthUser.email}
            <h1>Users</h1>
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>
                    Username
                  </th>
                  <th>
                    Admin
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index)=>(
                  <tr>
                    <td key={index}>
                      {user.email}
                    </td>
                    <td key={index}>
                      {user.admin}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
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

export async function getServerSideProps(){
  const users = await fetchFirebaseUsers()
  return {
    props: {
      users
    }
  }
}