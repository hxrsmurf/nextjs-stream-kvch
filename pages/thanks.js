import { useAuthUser, withAuthUser } from 'next-firebase-auth'
import React from 'react'
import { Container } from 'react-bootstrap'
import Loader from '../components/Loader'

export function thanks() {
    const AuthUser = useAuthUser()
  return (
    <Container className='mt-5'>
    {!AuthUser ? (
        <>Thanks for registering. We'll get back to you shortly.</>
    ) : (
        <>{AuthUser.email}  - Thanks for registering. We'll get back to you shortly.</>
    )}
    </Container>
  )
}



export default withAuthUser({
    LoaderComponent: Loader,
  })(thanks)