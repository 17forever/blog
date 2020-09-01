import Layout from '../components/Layout/index'
import Helmet from 'react-helmet'
import 'normalize.css'
import { initializeIcons } from '@uifabric/icons';
initializeIcons();

// @ts-ignore
function App({ Component, pageProps }) {
  return (
    <>
      <Helmet>
        <title>7inFen/Blog</title>
      </Helmet>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default App
