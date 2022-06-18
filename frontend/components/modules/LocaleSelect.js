import React from 'react'

import Select from '../elements/Select'


export default function LocaleSelect({className, locales, currentLangCode, onLocaleChange, ...props}) {
  return (
    <Select
      className={className}
      currentValue={currentLangCode}
      selections={locales}
      onSelectionChange={onLocaleChange}
      {...props}
    />
  )
}

