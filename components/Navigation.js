import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import Link from 'next/link'

export default function Navigation() {
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
        </Container>
    </Navbar>
  )
}
