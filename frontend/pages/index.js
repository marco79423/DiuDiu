import React from 'react'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import {StyledEngineProvider} from '@mui/material/styles'

import RollingDieLayout from '../components/layouts/RollingDieLayout'
import RollingObjectBox from '../containers/RollingObjectBox'

export const getStaticProps = async ({locale}) => ({
  props: {
    ...await serverSideTranslations(locale, ['common']),
  }
})

export default function RollingDiePage() {
  return (
    <StyledEngineProvider injectFirst>
      <RollingDieLayout>
        <RollingObjectBox/>
      </RollingDieLayout>
    </StyledEngineProvider>
  )
}
