import { AuthAction, useAuthUser, withAuthUser, getFirebaseAdmin } from "next-firebase-auth"
import { Container, Table } from "react-bootstrap"
import Loader from "../components/Loader"
import { fetchFirebaseUsers } from "../lib/fetchFirebaseUsers"
import { fetchFirebaseTV } from "../lib/fetchFirebaseTV"

export function admin({users, tv}) {
  const AuthUser = useAuthUser()
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
                  <tr key={index}>
                    <td>
                      {user.email}
                    </td>
                    <td key={index}>
                      {user.admin}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <h1>TV Shows</h1>
            <Table striped bordered hover variant="dark" >
              <thead>
                <tr>
                    <th>id</th>
                    <th>Show</th>
                </tr>
              </thead>

              <tbody>
                {tv.map((t, index)=>(
                  <tr key={index}>
                    <td>
                      {t.id}
                    </td>
                    <td key={index}>
                      {t.name}
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
  const tv = await fetchFirebaseTV()
  return {
    props: {
      users,
      tv
    }
  }
}