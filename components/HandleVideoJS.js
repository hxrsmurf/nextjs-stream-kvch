import { Container } from "react-bootstrap"
import Player from "./Player"
import config from "../lib/config"

export default function HandleVideoJS( props ) {
  const episode_data = props.data.episode
  const season_data = props.data.season
  const season_id = props.data.season_id
  const video_url = config().video_url

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

  const video_source = `${video_url}/${season_id}/${video_path}/${video_path}${config().video_extension}`

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

  return (
    <>
      <Container>
      <Player {...videoJsOptions}/>
      </Container>
    </>
  )
}
