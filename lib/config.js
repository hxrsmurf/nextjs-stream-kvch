export default function config() {
  return (
    {
        base_video: 'http://localhost:3000/api/tv',
        video_extension: '.m3u8',
        video_type: 'application/x-mpegURL',
        tmdb_base_url: 'https://api.themoviedb.org/3'
    }
  )
}