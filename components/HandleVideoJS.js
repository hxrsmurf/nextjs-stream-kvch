import { Container } from "react-bootstrap"
import Player from "./Player"

export default function HandleVideoJS() {
  const videoJsOptions = {
    controls: true,
    preload: 'auto',
    fluid: true,
    playbackRates: [0.5, 1, 1.5, 2],
    userActions: {'hotkeys' : true},
    autoplay: true,
    sources: [
      {
        src: '/37419/1.m3u8',
        type: 'application/x-mpegURL'
      }
    ]
  }

  return (
    <>
      <Container>
        <Player {...videoJsOptions}/>
      </Container>
    </>
  )
}
