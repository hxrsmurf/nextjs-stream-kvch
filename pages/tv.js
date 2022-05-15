import { Container } from "react-bootstrap";
import Navigation from "../components/Navigation";

import { loadtv } from "../lib/fetch-tv";

export default function tv(props) {

    const tv_poster = props.tv['result_tv_poster']
    const episodes = props.tv['episodes']

  return (
    <>
        <Navigation/>
        <Container className='mt-5'>
            <img src={tv_poster}></img>
            {episodes.map((episode, index) =>(
              <div key={index}>

                {episode.episodes.map((e, index)=> (
                  <div key={index}>
                    {e.name}

                  </div>
                ))}
                </div>
            ))}
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