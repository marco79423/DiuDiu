import React from 'react'
import {AppBar, Grid, Toolbar, Typography} from '@mui/material'
import {createUseStyles} from 'react-jss'
import CasinoIcon from '@mui/icons-material/Casino'
import {useTranslation} from 'next-i18next'


const useStyles = createUseStyles({
  root: {
    paddingLeft: 16,
    paddingRight: 16,
  },

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

export default function Header({right}) {
  const classes = useStyles()
  const {t} = useTranslation()

  return (
    <Grid className={classes.root} container component={AppBar} position="relative" justifyContent="space-between" alignItems="center">
      <Grid item>
        <Toolbar>
          <CasinoIcon className={classes.icon}/>
          <Typography className={classes.title} variant="h1" color="inherit" noWrap>{t('DiuDiu')}</Typography>
        </Toolbar>
      </Grid>
      <Grid item>
        {right}
      </Grid>
    </Grid>
  )
}
