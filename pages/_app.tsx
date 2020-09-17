import React, { useState, useEffect } from 'react'
import { AppProps } from 'next/app'
import Helmet from 'react-helmet'
import { Context as ResponsiveContext } from 'react-responsive'
import { initializeIcons } from '@uifabric/icons'
import 'normalize.css'
import logTheme from '../utils/logTheme'
import logContact from '../utils/logContact'
import Layout from '../components/Layout/index'
import 'highlight.js/styles/vs.css'
import 'github-markdown-css'

// initializeIcons('https://17forever.me/fonts/fluentui/')
initializeIcons()
logContact()
if (process.env.NODE_ENV === 'development') {
  logTheme()
}

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const [viewportWidth, setViewportWidth] = useState(1920)
  useEffect(() => {
    let resizeEvent: any = null
    if (typeof window !== 'undefined') {
      handleSetClientWidth()
      resizeEvent = window.addEventListener('resize', handleSetClientWidth)
    }
    return () => {
      resizeEvent && window.removeEventListener('resize', handleSetClientWidth)
    }
  }, [])

  const handleSetClientWidth = () => {
    setViewportWidth(document.documentElement.clientWidth)
  }

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
