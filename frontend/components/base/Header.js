import React from 'react'
import {AppBar, Toolbar, Typography} from '@mui/material'
import {createUseStyles} from 'react-jss'
import CasinoIcon from '@mui/icons-material/casino'


const useStyles = createUseStyles({
  icon: {
    fontSize: '2rem',
    marginRight: 16,
  },

  title: {
    fontSize: '1.5rem',
    fontWeight: 700,
    userSelect: 'none',
  }
})

export default function Header() {
  const classes = useStyles()

  return (
    <AppBar position="relative">
      <Toolbar>
        <CasinoIcon className={classes.icon}/>
        <Typography className={classes.title} variant="h1" color="inherit" noWrap>丟丟</Typography>
      </Toolbar>
    </AppBar>
  )
}
