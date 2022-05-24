import { Col, Container, Image, Row } from "react-bootstrap";
import config from "../lib/config";
const image_url = config().tmdb_image_url

export default function index({result}) {
  return (
      <>
      <Container className='mt-5'>
        <Row>
              {result.map((t, index)=> (
                  <Col key={index}>
                    <a  href={'tv/' + t.id + '-' + t.name}><Image src={image_url + t.poster}></Image></a>
                  </Col>
              ))}
        </Row>
      </Container>
      </>
  )
}

export async function getStaticProps(){
    //const tv = await fetchfirebaseTV()
    const query = await fetch('http://localhost:3000/api/firebasetv')
    const result = await query.json()
    return {
      props: {
        result
      }
    }
  }