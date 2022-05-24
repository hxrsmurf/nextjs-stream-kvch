import { Col, Container, Image, Row } from "react-bootstrap"
import config from "../../lib/config"
import fetchFirebaseTV from "../../lib/fetchFirebaseTV"

export default function series({data}) {
  return (
    <>
    <Container className='mt-5'>
      <Row>
        <Col xs={4}>
          <h1>{data.name}</h1>
        </Col>
        <Col className='mt-2'>
          <h5>{data.tagline}</h5>
        </Col>
      </Row>
      <br/>
      {data.seasons.map((season, index)=> (
        <div key={index}>
          <h1>{season.name}</h1>
          <Image src={config().tmdb_image_url + season.poster_path}/>
        </div>
      ))}
    </Container>
    </>
  )
}

export async function getStaticPaths () {
  const result = await fetchFirebaseTV()
  const paths = result.map((series)=> ({
    params: {
      series: series.id + '-' + series.name
    }
  }))

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps ({params}){
  const seriesID = (params.series).split('-')[0]
  const query = await fetch(config().base_api + '/tv?id=' + seriesID)
  const data = await query.json()

  return {
    props: {
      data
    }
  }
}
