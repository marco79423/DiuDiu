import React from 'react'
import dynamic from 'next/dynamic'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'

import RollingDieLayout from '../components/layouts/RollingDieLayout'
import StatsDialogContainer from '../containers/StatsDialogContainer'
import LocaleSelectContainer from '../containers/LocaleSelectContainer'

export const getStaticProps = async ({locale}) => ({
  props: {
    ...await serverSideTranslations(locale, ['common']),
  }
})

const RollingObjectBoxContainer = dynamic(() => import('../containers/RollingObjectBoxContainer'), { ssr: false })

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
      <RollingDieLayout right={<LocaleSelectContainer/>} onStatsDialogOpen={onStatsDialogOpen}>
        <RollingObjectBoxContainer/>
      </RollingDieLayout>

      <StatsDialogContainer open={statsDialogOpen} onClose={onStatsDialogClose}/>
    </>
  )
}
