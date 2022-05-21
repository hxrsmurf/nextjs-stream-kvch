import { useAuthUser, withAuthUser } from "next-firebase-auth";
import { useEffect, useState } from "react";
import { Button, Col, Container, Form, FormGroup, FormLabel } from "react-bootstrap";
import Loader from "../components/Loader";
import send from "./api/send_twilio";

export function register() {
  const AuthUser = useAuthUser()
  const [email, setEmail] = useState()

  const submit = (e) => {
        e.preventDefault()
        if (!email){
            var registered_email = AuthUser.email
        } else {
            var registered_email = email
        }
        send(registered_email)
        location.replace('/thanks')
    }

  return (
    <Container className='mt-5'>
        <Form>
            <Col xs={7}>
                <FormGroup>
                    <FormLabel>Please register for access.</FormLabel>
                    <Form.Control
                        type='email'
                        name='email'
                        defaultValue={AuthUser.email}
                        onChange={(e)=> setEmail(e.target.value)}
                    />
                </FormGroup>
            </Col>
            <Button className='mt-2' variant='primary' type='submit' onClick={(e) => submit(e)}>
                Register
            </Button>
        </Form>
    </Container>
  )
}

export default withAuthUser({
    LoaderComponent: Loader,
  })(register)