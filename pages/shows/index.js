import { Container } from "react-bootstrap";
import { fetchFirebaseTV } from "../../lib/fetchFirebaseTV";

export default function index({tv}) {
    console.log(tv)
  return (
      <>
      <Container className='mt-5'>
          <ul>
              {tv.map((t, index)=> (
                  <li key={index}>
                    <a href={'shows/' + t.name}>{t.name}</a>
                  </li>
              ))}
          </ul>
      </Container>
      </>
  )
}



export async function getStaticProps(){
    const tv = await fetchFirebaseTV()
    return {
      props: {
        tv
      }
    }
  }