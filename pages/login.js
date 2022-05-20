import { withAuthUser, AuthAction } from 'next-firebase-auth'
import { Container } from 'react-bootstrap'
import FirebaseAuth from '../components/FireBaseAuth'
import Loader from '../components/Loader'

function login() {
  return (
    <>
        <Container className='mt-5'>
            Login Page
            <FirebaseAuth/>
        </Container>
    </>
  )
}

export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.RENDER,
  LoaderComponent: Loader,
})(login)