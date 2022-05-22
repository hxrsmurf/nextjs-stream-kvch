import { AuthAction, useAuthUser, withAuthUser } from "next-firebase-auth"
import { Container } from "react-bootstrap"
import Loader from "../components/Loader"
import checkAuth from "../utils/checkAuth"
import initAuth from "../utils/initAuth"

initAuth()

export function admin() {
  const AuthUser = useAuthUser()
  checkAuth(AuthUser)
  return (
    <>
        <Container className='mt-5'>
            Admin dashboard for {AuthUser.email}
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
