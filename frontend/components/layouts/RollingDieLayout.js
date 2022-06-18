import React from 'react'
import {createUseStyles} from 'react-jss'
import {useViewportSize} from '@paji-sdk/web'
import {CssBaseline, Fab} from '@mui/material'

import Header from '../base/Header'
import {useTranslation} from 'next-i18next'


const useStyles = createUseStyles({
  root: ({width, height}) => ({
    width: width,
    height: height,

    display: 'flex',
    flexDirection: 'column',
  }),

  body: {
    flex: 1,
    position: 'relative',
  },

  fab: {
    zIndex: 9,
    position: 'fixed',

    right: 32,
    bottom: 32,

    fontSize: '2rem',
    userSelect: 'none'
  }
})

export default function RollingDieLayout({children, right, onStatsDialogOpen}) {
  const {t} = useTranslation()
  const {width, height} = useViewportSize()
  const classes = useStyles({width, height})

  return (
    <>
      <CssBaseline/>

      <div className={classes.root}>
        <Header right={right}/>
        <main className={classes.body}>
          {children}
        </main>

        <Fab className={classes.fab} variant="extended" aria-label={t('Stats')} onClick={onStatsDialogOpen}>
          {t('Stats')}
        </Fab>
      </div>
    </>

  )
}
