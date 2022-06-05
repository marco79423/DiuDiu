import React from 'react'
import Document, {Head, Html, Main, NextScript} from 'next/document'
import {createGenerateId, JssProvider, SheetsRegistry} from 'react-jss'
import createEmotionServer from '@emotion/server/create-instance'

import createEmotionCache from '../utils/createEmotionCache'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    // Emotion
    const cache = createEmotionCache()
    const {extractCriticalToChunks} = createEmotionServer(cache)

    // JSS
    const registry = new SheetsRegistry()
    const generateId = createGenerateId()

    const originalRenderPage = ctx.renderPage
    ctx.renderPage = () =>
      originalRenderPage({
        // eslint-disable-next-line react/display-name
        enhanceApp: (App) => (props) => (
          <JssProvider registry={registry} generateId={generateId}>
            <App emotionCache={cache} {...props} />
          </JssProvider>
        ),
      })

    const initialProps = await Document.getInitialProps(ctx)
    const emotionStyles = extractCriticalToChunks(initialProps.html)

    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          {emotionStyles.styles.map((style) => (
            <style
              data-emotion={`${style.key} ${style.ids.join(' ')}`}
              key={style.key}
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{__html: style.css}}
            />
          ))}
          <style id="server-side-styles">{registry.toString()}</style>
        </>
      ),
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
        </Head>
        <body>
        <Main/>
        <NextScript/>
        </body>
      </Html>
    )
  }
}
