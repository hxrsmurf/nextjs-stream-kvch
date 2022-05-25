import { Col, Container, Image, Row } from "react-bootstrap";
import config from "../lib/config";
import fetchFirebaseTV from "../lib/fetchFirebaseTV";
const image_url = config().tmdb_image_url

export default function index({seriesFirebase}) {
  return (
      <>
      <Container className='mt-5'>
        <Row>
              {seriesFirebase.map((data, index)=> (
                  <Col key={index} className='mt-5'>
                    <a  href={'tv/' + data.id + '-' + data.name}><Image src={image_url + data.poster}></Image></a>
                  </Col>
              ))}
        </Row>
      </Container>
      </>
  )
}

export async function getStaticProps(){
    const seriesFirebase = await fetchFirebaseTV()
    return {
      props: {
        seriesFirebase
      }
    }
  }