import FirebaseAuth from "../components/FirebaseAuth"
import { Container } from "react-bootstrap"

export default function login() {
    return (
        <div>
           <Container className='mt-5'>
            <FirebaseAuth/>
           </Container>
        </div>
    )
}