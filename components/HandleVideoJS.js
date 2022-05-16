import { Container } from "react-bootstrap"
import Player from "./Player"
import config from "../lib/config"

export default function HandleVideoJS( props ) {
  const episode_data = props.data.episode
  const season_data = props.data.season
  const video_url = config().base_video

  if (season_data < 10) {
    var season = 'S0' + season_data
  } else {
    var season = 'S' + season_data
  }

  if (episode_data < 10) {
    var episode = 'E0' + episode_data
  } else {
    var episode = 'E' + episode_data
  }

  const video_path = `${season}${episode}`

  const video_source = `${video_url}/${video_path}/${video_path}${config().video_extension}`
  console.log(video_source)

  const videoJsOptions = {
    controls: true,
    preload: 'auto',
    fluid: true,
    playbackRates: [0.5, 1, 1.5, 2],
    userActions: {'hotkeys' : true},
    autoplay: true,
    sources: [
      {
        src: video_source,
        type: config().video_type
      }
    ]
  }
  console.log(videoJsOptions)

  return (
    <>
      <Container>
      <Player {...videoJsOptions}/>
      </Container>
    </>
  )
}
