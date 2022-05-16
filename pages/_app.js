import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css'
import Navigation from '../components/Navigation'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navigation/>
      <Component {...pageProps}/>
    </>
  )
}

export default MyApp