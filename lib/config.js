export default function config() {
  return (
    {
        base_video: 'http://localhost:3000/api/tv',
        base_api: 'http://localhost:3000/api',
        video_url: 'https://cdn.stream.hxrsmurf.info',
        video_extension: '.m3u8',
        video_type: 'application/x-mpegURL',
        tmdb_base_url: 'https://api.themoviedb.org/3',
        tmdb_image_url: 'https://image.tmdb.org/t/p/w500/',
        headers: {
          Authorization: 'Bearer ' + process.env.TMDB_API_KEY,
          'Content-Type': 'application/json;charset=utf-8'
        }
    }
  )
}