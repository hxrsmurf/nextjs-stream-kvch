import { loadtv } from "../../lib/fetch-tv"
import { Container, Modal, Button, Row, Col} from "react-bootstrap";
import { useEffect, useState } from "react";
import HandleVideoJS from "../../components/HandleVideoJS";

function VerticleModal(props){
  return (
    <Modal {...props} centered fullscreen>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <HandleVideoJS/>
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

  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [modalData, setModalData] = useState(false)

  return (
    <>
      <Container className='mt-5'>
      <h3>{season_name}</h3>
      {list_of_episodes.map((episode, index) => (
        <Row key={index}>
          <Col>
            <Button
              variant='outline-dark'
              className='mt-2'
              onClick={()=> {
                setModalData(episode.name)
                setModalIsOpen(true)
              }}
            >
            {episode.name}
          </Button>
          </Col>
        </Row>
      ))}

      <VerticleModal
        show={modalIsOpen}
        onHide={()=>setModalIsOpen(false)}
        title={modalData}
      />
      </Container>
    </>
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