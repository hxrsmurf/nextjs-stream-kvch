import { loadtv } from "../../lib/fetch-tv"
import { Container, Modal, Button } from "react-bootstrap";
import { useEffect, useState } from "react";

function simulateNetworkRequest(){
  return new Promise((resolve)=> setTimeout(resolve,50))
}

function VerticleModal(props){
  return (
    <Modal {...props} size='lg' centered fullscreen>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        VideoJS
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default function handler({episode}) {
  const list_of_episodes = episode.episodes
  const season_name = episode.name

  const [modalShow, setModalShow] = useState(false)
  const [isLoading, setLoading] = useState(false)

  useEffect(()=> {
    if (isLoading) {
      simulateNetworkRequest().then(()=>{
        setLoading(false)
        setModalShow(true)
      })
    }
  }, [isLoading])

  const handleClose = () => {
    setModalShow(false)
    setLoading(false)
  }
  const handleShow =() => {
    setLoading(true)
  }

  return (
    <Container className='mt-5'>
    <h3>{season_name}</h3>
      {list_of_episodes.map((episode, index)=> (
        <div key={index}>
          <Button
            variant="outline-dark"
            className='mt-2'
            disabled={isLoading}
            onClick={!isLoading ? handleShow : null}
          >
          {isLoading ? 'Loading...' : `${episode.name}` }
          </Button>

          <VerticleModal title={episode.name} show={modalShow} onHide={()=> setModalShow(false)} />
        </div>
      ))}
    </Container>
  )
}

export async function getStaticPaths() {
  const result = await loadtv()
  const episodes = result.results
  const paths = episodes.map((episode) => ({
    params: { episode: episode.id.toString()}
  }))
  return { paths, fallback: false }
}

export async function getStaticProps( {params} ){
  const episode = await loadtv(params)
  return {
    props: {
      episode
    }
  }
}