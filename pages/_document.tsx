/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import Document, { DocumentContext } from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import { Stylesheet, InjectionMode } from '@uifabric/merge-styles'
import { resetIds } from '@uifabric/utilities'

// Do this in file scope to initialize the stylesheet before Fabric components are imported.
const stylesheet = Stylesheet.getInstance()

// Set the config.
stylesheet.setConfig({
  injectionMode: InjectionMode.none,
  namespace: 'server',
})

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    stylesheet.reset()
    resetIds()

    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      const styleTags = stylesheet.getRules(true)

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            <style type="text/css" dangerouslySetInnerHTML={{ __html: styleTags }} />
            {sheet.getStyleElement()}
            <script defer src="//at.alicdn.com/t/font_2045870_aqrzv8i71pd.js" />
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }
}
