import React from 'react'
import Document, {Head, Html, Main, NextScript} from 'next/document'
import {createGenerateId, JssProvider, SheetsRegistry} from 'react-jss'

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head/>
        <body>
        <Main/>
        <NextScript/>
        </body>
      </Html>
    )
  }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with server-side generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // Render app and page and get the context of the page with collected side effects.
  const registry = new SheetsRegistry();
  const generateId = createGenerateId();
  const originalRenderPage = ctx.renderPage;
  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => (
        <JssProvider registry={registry} generateId={generateId}>
          <App {...props} />
        </JssProvider>
      ),
    })
  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    styles: (
      <>
        {initialProps.styles}
        <style id="server-side-styles">{registry.toString()}</style>
      </>
    ),
  }
}
