import React from 'react'
import Head from 'next/head'
import getConfig from 'next/config'
import {useRouter} from 'next/router'
import {CacheProvider} from '@emotion/react'
import {appWithTranslation, useTranslation} from 'next-i18next'
import {useCanonicalUrl} from '@paji-sdk/next-lib'
import {StyledEngineProvider} from '@mui/material'

import AppProvider from '../containers/AppProvider'
import createEmotionCache from '../utils/createEmotionCache'
import useTracker from '../hooks/useTracker'


// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

function App({Component, emotionCache = clientSideEmotionCache, pageProps}) {
  const tracker = useTracker()
  const router = useRouter()
  const {publicRuntimeConfig} = getConfig()
  const canonicalUrl = useCanonicalUrl(publicRuntimeConfig.hostUrl)
  const {t} = useTranslation()

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  React.useEffect(() => {
    // `routeChangeComplete` won't run for the first page load unless the query string is
    // hydrated later on, so here we log a page view if this is the first render and
    // there's no query string
    if (!router.asPath.includes('?')) {
      tracker.pageView()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(() => {
    // Listen for page changes after a navigation or when the query changes
    router.events.on('routeChangeComplete', tracker.pageView)
    return () => {
      router.events.off('routeChangeComplete', tracker.pageView)
    }
  }, [tracker.pageView, router.events])

  return (
    <>
      <Head>
        <title>{t('DiuDiu')}</title>

        <meta name="application-name" content={t('DiuDiu')}/>
        <meta name="description" content={t('DiuDiu is DiuDiu game')}/>
        <meta name="keywords" content="diudiu"/>

        <meta name="twitter:card" content="summary"/>
        <meta name="twitter:url" content={canonicalUrl}/>
        <meta name="twitter:title" content={t('DiuDiu')}/>
        <meta name="twitter:description" content={t('')}/>
        <meta name="twitter:image" content={`${canonicalUrl}/logo.jpg`}/>
        <meta name="twitter:creator" content="@marco79423"/>
        <meta property="og:type" content="website"/>
        <meta property="og:title" content={t('DiuDiu')}/>
        <meta property="og:description" content={t('')}/>
        <meta property="og:site_name" content={t('DiuDiu')}/>
        <meta property="og:url" content={canonicalUrl}/>
        <meta property="og:image" content={`${canonicalUrl}/logo.jpg`}/>

        <link rel="icon" href="/favicon.ico"/>
        <link rel="shortcut icon" href="/favicon.ico"/>
        <link rel="apple-touch-icon" sizes="180x180" href="/logo-180x180.png"/>
        <link rel="icon" type="image/png" sizes="192x192" href="/logo-192x192.png"/>
        <link rel="icon" type="image/png" sizes="512x512" href="/logo-512x512.png"/>

        <link rel="canonical" href={canonicalUrl}/>
      </Head>

      <CacheProvider value={emotionCache}>
        <StyledEngineProvider injectFirst>
          <AppProvider>
            <Component {...pageProps} />
          </AppProvider>
        </StyledEngineProvider>
      </CacheProvider>
    </>
  )
}

export default appWithTranslation(App)
