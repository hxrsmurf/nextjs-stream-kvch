import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import Link from 'next/link'
import { useAuthUser, withAuthUser } from 'next-firebase-auth'
import { NavDropdown } from 'react-bootstrap'
import FirebaseAuth from './FirebaseAuth'

export function Navigation() {
  const AuthUser = useAuthUser()

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
                {AuthUser.email === 'stream@hxrsmurf.info' ? (
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