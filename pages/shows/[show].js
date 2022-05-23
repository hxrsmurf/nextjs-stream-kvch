import { useRouter } from "next/router";
import { Container } from "react-bootstrap";
import {fetchShow} from "../../lib/fetchShow";

export default function show({show}) {
  const showDetails = show[0]
  console.log(show)

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
          show: 'Zoids'
        },
      }
    ],
    fallback: false
  }
}

export async function getStaticProps( {params} ){
  //const query = await fetch('http://localhost:3000/api/shows?show=' + params.show)
  const url = 'http://localhost:3000/api/shows?show=' + params.show
  const query = await fetch(url)
  const result = await query.json()
  return {
    props: {
      show: result.results
    }
  }
}