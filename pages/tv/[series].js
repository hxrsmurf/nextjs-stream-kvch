import { useEffect, useState } from "react"
import { Button, Card, Col, Container, Image, Modal, Row } from "react-bootstrap"
import config from "../../lib/config"
import fetchFirebaseTV from "../../lib/fetchFirebaseTV"

import HandleVideoJS from '../../components/HandleVideoJS'

function VerticleModal(props){
  return (
    <Modal {...props} centered fullscreen>
      <Modal.Header closeButton/>
      <Modal.Title>{props.name}</Modal.Title>

      <Modal.Body>
        <HandleVideoJS data={props.data}/>
      </Modal.Body>
    </Modal>
  )
}

export default function series({data, seasonData}) {
  const [season, setSeason] = useState()
  const [modalOpen, setModalOpen] = useState(false)
  const [episodeOpen, setEpisodeOpen] = useState()
  const [episodeData, setEpisodeData] = useState()
  const [episodeName, setEpisodeName] = useState()

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
        <>
        <div key={index}>
          <h1>{season.name}</h1>
          <a style={{ cursor: 'pointer' }} onClick={() => { setSeason(season.season_number); setModalOpen(true) } }><Image src={config().tmdb_image_url + season.poster_path} /></a>
        </div>

        <Modal
          show={modalOpen}
          onHide={() => setModalOpen(false)}
          fullscreen
        >
            <Modal.Header closeButton>
              <Modal.Title>{data.name} - {season.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {seasonData.episodes.map((episode, index)=>(
                <Container>
                  <Card key={index} className='mt-3' style={{width: '50rem'}} border='dark' bg='dark' text='white'>
                  {episode.still_path ?
                  (<Card.Img variant='top' src={config().tmdb_image_url + episode.still_path}/>)
                  : null }
                    <Container>
                      <Card.Title className='mt-2'>{episode.episode_number}. {episode.name}</Card.Title>
                      <Card.Text>{episode.overview}</Card.Text>
                      <Card.Footer className='mb-2'>
                        <Button
                          onClick={()=>{
                            setEpisodeData({
                              name: episode.name,
                              episode: episode.episode_number,
                              season: episode.season_number,
                              season_id: seasonData.id,
                              series_id: data.id
                            })
                            setEpisodeName(episode.name)
                            setEpisodeOpen(true)
                          }}
                          >
                          Watch
                        </Button>
                      </Card.Footer>
                    </Container>
                  </Card>
                </Container>
              ))}
            </Modal.Body>
          </Modal>
          </>
      ))}
    </Container>

    <VerticleModal
        show={episodeOpen}
        onHide={()=>setEpisodeOpen(false)}
        data={episodeData}
        name={episodeName}
      />
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

  const seasons = data.seasons
  // need to handle multiple seasons...

  const seasonURL = config().base_api + '/season?series=' + data.id + '&season=' + seasons[0].season_number
  const seasonQuery = await fetch(seasonURL)
  const seasonData = await seasonQuery.json()

  return {
    props: {
      data,
      seasonData
    }
  }
}
