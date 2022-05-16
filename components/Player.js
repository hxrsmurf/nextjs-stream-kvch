// https://github.com/waskito/react-modal-videojs

import { useCallback, useEffect, useState } from 'react'
import videojs from 'video.js'

const Player = (props) => {
  const [videoEl, setVideoEl] = useState(null)
  const onVideo = useCallback((el) => {
    setVideoEl(el)
  }, [])

  useEffect(() => {
    if (videoEl == null) return
    const player = videojs(videoEl, props)
    return () => {
      player.dispose()
    }
  }, [props, videoEl])

  return (
    <>
      <div data-vjs-player>
        <video ref={onVideo} className="video-js"/>
      </div>
    </>
  )
}
export default Player