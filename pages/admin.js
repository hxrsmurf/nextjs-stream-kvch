import { AuthAction, useAuthUser, withAuthUser, getFirebaseAdmin } from "next-firebase-auth"
import { Button, Col, Container, Form, Modal, ModalHeader, Row, Table } from "react-bootstrap"
import Loader from "../components/Loader"
import { fetchFirebaseUsers } from "../lib/fetchFirebaseUsers"
import { fetchFirebaseTV } from "../lib/fetchFirebaseTV"
import { useState } from "react"
import { addFirebaseTV } from "../lib/addFirebaseTV"

export function admin({users, tv}) {
  const AuthUser = useAuthUser()
  const [modalOpen, setModalOpen] = useState(false)
  const [newTV, setNewTV] = useState()

  const addTVShow = () => {
    addFirebaseTV(newTV)
  }

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

            <Row>
              <Col>
                <h1>TV Shows</h1>
              </Col>
              <Col>
                <Button className="mt-2" onClick={()=> {setModalOpen(true)}}>
                  Add
                </Button>
              </Col>

            </Row>
            <Table striped bordered hover variant="dark" >
              <thead>
                <tr>
                    <th>Show</th>
                </tr>
              </thead>

              <tbody>
                {tv.map((t, index)=>(
                  <tr key={index}>
                    <td key={index}>
                      {t.name}
                    </td>
                  </tr>
                ))}
                </tbody>
            </Table>
        </Container>

        <Modal
        show={modalOpen}
        onHide={()=> {setModalOpen(false)}}
        centered
        >
          <Modal.Header>
            <Modal.Title>Add TV Show</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Control
                as="textarea" rows={2}
                onChange={(e)=> setNewTV(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={()=> {setModalOpen(false)}}>Close</Button>
            <Button variant="success" onClick={()=>{setModalOpen(false); addTVShow()}}>Add</Button>
          </Modal.Footer>

        </Modal>
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