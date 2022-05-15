import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'

export default function Navigation() {
  return (
    <Navbar bg='dark' variant='dark'>
        <Container>
            <Navbar.Brand href="/">Streaming</Navbar.Brand>
            <Nav className='me-auto'>
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/tv">TV</Nav.Link>
            </Nav>
        </Container>
    </Navbar>
  )
}
