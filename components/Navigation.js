import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import Link from 'next/link'
import check_loggedin from '../lib/check_loggedin'
import { NavDropdown } from 'react-bootstrap'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import FirebaseAuth from './FirebaseAuth'

export default function Navigation() {
  const loggedin = check_loggedin()
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
              <FirebaseAuth/>
            </Nav>
        </Container>
    </Navbar>
  )
}
