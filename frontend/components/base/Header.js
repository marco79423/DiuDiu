import React from 'react'
import {createUseStyles} from 'react-jss'
import CasinoIcon from '@mui/icons-material/Casino'
import {useTranslation} from 'next-i18next'


const useStyles = createUseStyles({
  root: {
    paddingLeft: 16,
    paddingRight: 16,
    height: 56,

    display: 'flex',
    position: 'relative',
    justifyContent: 'space-between',
    alignItems: 'center',

    backgroundColor: 'rgb(57, 73, 171)',
  },

  logo: {
    display: 'flex',
    alignItems: 'center',
  },

  icon: {
    fontSize: '2rem',
    marginRight: 16,

    color: 'white',
  },

  title: {
    fontSize: '1.5rem',
    fontWeight: 700,
    userSelect: 'none',

    color: 'white',
  }
})

export default function Header({right}) {
  const classes = useStyles()
  const {t} = useTranslation()

  return (
    <header className={classes.root}>
      <div className={classes.logo}>
        <CasinoIcon className={classes.icon}/>
        <h1 className={classes.title}>{t('DiuDiu')}</h1>
      </div>

      {right}
    </header>
  )
}
