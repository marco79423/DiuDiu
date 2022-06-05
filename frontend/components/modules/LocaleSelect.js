import React from 'react'
import {createUseStyles} from 'react-jss'

import Select from '../elements/Select'

const useStyles = createUseStyles((theme) => ({
  root: {
  },
}))

export default function LocaleSelect({className, locales, currentLangCode, onLocaleChange, ...props}) {
  const classes = useStyles()

  return (
    <Select
      className={`${classes.root} ${className}`}
      currentValue={currentLangCode}
      selections={locales}
      onSelectionChange={onLocaleChange}
      {...props}
    />
  )
}

