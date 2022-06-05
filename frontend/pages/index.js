import React from 'react'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'

import RollingDieLayout from '../components/layouts/RollingDieLayout'
import RollingObjectBox from '../containers/RollingObjectBox'
import StatsDialogContainer from '../containers/StatsDialogContainer'

export const getStaticProps = async ({locale}) => ({
  props: {
    ...await serverSideTranslations(locale, ['common']),
  }
})

export default function RollingDiePage() {
  const [statsDialogOpen, setStatsDialogOpen] = React.useState(false)

  const onStatsDialogOpen = () => {
    setStatsDialogOpen(true)
  }

  const onStatsDialogClose = () => {
    setStatsDialogOpen(false)
  }

  return (
    <>
      <RollingDieLayout onStatsDialogOpen={onStatsDialogOpen}>
        <RollingObjectBox/>
      </RollingDieLayout>

      <StatsDialogContainer open={statsDialogOpen} onClose={onStatsDialogClose}/>
    </>
  )
}
