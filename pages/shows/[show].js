import { Container } from "react-bootstrap";

const image_url = 'https://image.tmdb.org/t/p/w500/'

export default function show({show, params}) {
  const showDetails = show[0]
  console.log(params)

  return (
    <>
    <Container className="mt-5">
      <h1>{showDetails.name}</h1>
      <p>{showDetails.overview}</p>
    </Container>
    </>
  )
}

export async function getStaticPaths() {
  return {
    paths: [
      {
        params:
        {
          show: 'Moon Knight'
        },
      },
      {
        params:
        {
          show: '134-Zoids'
        },
      }
    ],
    fallback: false
  }
}

export async function getStaticProps( {params} ){
  const searchShow = (params.show).split('-')[1]
  const url = 'http://localhost:3000/api/shows?show=' + searchShow
  const query = await fetch(url)
  const result = await query.json()
  return {
    props: {
      show: result.results,
      params
    }
  }
}