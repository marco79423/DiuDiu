import React from 'react'
import {createUseStyles} from 'react-jss'

import useWindowSize from '../../hooks/useWindowSize'
import Header from '../base/Header'
import {Fab} from '@mui/material'


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

export default function RollingDieLayout({children, onStatsDialogOpen}) {
  const {width, height} = useWindowSize()
  const classes = useStyles({width, height})

  return (
    <div className={classes.root}>
      <Header/>
      <div className={classes.body}>
        {children}
      </div>

      <Fab className={classes.fab} variant="extended" aria-label="丟" onClick={onStatsDialogOpen}>
        統計
      </Fab>
    </div>
  )
}
