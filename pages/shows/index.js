import { Col, Container, Image, Row } from "react-bootstrap";
import { fetchFirebaseTV } from "../../lib/fetchFirebaseTV";

const image_url = 'https://image.tmdb.org/t/p/w500/'

export default function index({tv}) {
  return (
      <>
      <Container className='mt-5'>
        <Row>
              {tv.map((t, index)=> (
                  <Col key={index}>
                    <a  href={'shows/' + t.name}><Image src={image_url + t.poster}></Image></a>
                  </Col>
              ))}
        </Row>
      </Container>
      </>
  )
}

export async function getStaticProps(){
    const tv = await fetchFirebaseTV()
    return {
      props: {
        tv
      }
    }
  }