import { loadtv } from "../../lib/fetch-tv"
import { Container, Row, Col, Modal, Button } from "react-bootstrap";

import { useRouter } from "next/router"
import Navigation from "../../components/Navigation"
import { useEffect, useState } from "react";

function simulateNetworkRequest(){
  return new Promise((resolve)=> setTimeout(resolve,5000))
}

export default function handler({episode}) {
  const list_of_episodes = episode.episodes
  const season_name = episode.name

  const [show, setShow] = useState(false)
  const [isLoading, setLoading] = useState(false)

  useEffect(()=> {
    if (isLoading) {
      simulateNetworkRequest().then(()=>{
        setLoading(false)
        setShow(true)
      })
    }
  }, [isLoading])

  const handleClose = () => {
    setShow(false)
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
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Test</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            test
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>

        </Modal>
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