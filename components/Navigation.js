import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import Link from 'next/link'
import { useAuthUser, withAuthUser } from 'next-firebase-auth'
import { NavDropdown } from 'react-bootstrap'
import FirebaseAuth from './FirebaseAuth'
import checkFirebaseAdmin from '../utils/checkFirebaseAdmin'
import { useEffect, useState } from 'react'
import initAuth from '../utils/initAuth'

initAuth()

export function Navigation() {
  const AuthUser = useAuthUser()
  const [authed, setAuthed] = useState()

  // Doesn't work yet...
  useEffect(async () => {
    const result = await checkFirebaseAdmin(AuthUser).then((result)=> {return result})
    result.map((r)=>{
      if(r.email === AuthUser.email){
        setAuthed(r.admin)
      }
    })
  }, [])

  return (
    <Navbar bg='dark' variant='dark'>
        <Container>
            <Navbar.Brand href="/">Streaming</Navbar.Brand>
            <Nav className='me-auto'>
              <Link href='/' passHref>
                <Nav.Link>Home</Nav.Link>
              </Link>
              <Link href='/tv' passHref>
                <Nav.Link>TV</Nav.Link>
              </Link>
            </Nav>
            <Nav>
            {!AuthUser.email ? (
                <><FirebaseAuth/></>
              ) : (
               <NavDropdown title={AuthUser.displayName} id='nav-dropdown'>
                {authed ? (
                  <NavDropdown.Item onClick={()=> location.replace('/admin')}>Admin</NavDropdown.Item>
                    ) : null
                  }
                 <NavDropdown.Item onClick={() => {AuthUser.signOut()}}>Logout</NavDropdown.Item>
               </NavDropdown>
              )
            }
            </Nav>
        </Container>
    </Navbar>
  )
}

export default withAuthUser()(Navigation)