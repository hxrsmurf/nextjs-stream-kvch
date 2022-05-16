import { Container, Row, Col, Image } from "react-bootstrap";

import { loadtv } from "../lib/fetch-tv";

const image_url = 'https://image.tmdb.org/t/p/w500'

export default function tv( {tv} ) {
  //console.log(tv)
  return (
    <>
        <Container className='mt-5'>
        <Container>
        <Row>
            {tv.results.map((result, index)=> (
              <Col xs={4} md={6} key={index}>
                <a href={'tv/' + result.id}>
                    <img src={image_url + result.poster_path} className='img-fluid rounded mt-2 border border-dark' />
                </a>
              </Col>
            ))}
            </Row>
        </Container>
        </Container>
    </>
  )
}

export async function getStaticProps(){
  const tv = await loadtv()
  return {
    props: {
      tv
    }
  }
}