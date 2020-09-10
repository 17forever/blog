import React, { useState, useEffect } from 'react'
import Helmet from 'react-helmet'
import { Context as ResponsiveContext } from 'react-responsive'
import { initializeIcons } from '@uifabric/icons'
import 'normalize.css'
import logTheme from '../utils/logTheme'
import 'highlight.js/styles/vs.css'
import Layout from '../components/Layout/index'

initializeIcons()
logTheme()

// @ts-ignore
function App({ Component, pageProps }) {
  const [viewportWidth, setViewportWidth] = useState(1920)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setViewportWidth(window?.screen?.availWidth)
    }
  }, [])

  // TODO page resize event

  return (
    <ResponsiveContext.Provider value={{ width: viewportWidth }}>
      <Helmet>
        <title>17 Forever</title>
      </Helmet>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ResponsiveContext.Provider>
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
