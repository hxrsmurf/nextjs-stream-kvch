import { loadtv } from "../../lib/fetch-tv"
import { Container, Row, Col } from "react-bootstrap";

import { useRouter } from "next/router"
import Navigation from "../../components/Navigation"

export default function handler({episode}) {
  const list_of_episodes = episode.episodes
  return (
    <Container className='mt-5'>
      {list_of_episodes.map((r, index)=> (
        <div key={index}>
          {r.episode_number} - {r.name}
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