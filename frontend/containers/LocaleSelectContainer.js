import React from 'react'
import {useRouter} from 'next/router'
import {useTranslation} from 'next-i18next'

import * as config from '../config'
import LocaleSelect from '../components/modules/LocaleSelect'


export default function LocaleSelectContainer(props) {
  const {i18n} = useTranslation()

  const locales = React.useMemo(() => config.Locales.map(locale => ({
    key: locale.langCode,
    label: locale.label,
    value: locale.langCode,
  })), [])

  const router = useRouter()

  const onLocaleChange = async (value) => {
    await router.replace(router.pathname, router.pathname, {locale: value})
  }

  return (
    <LocaleSelect
      currentLangCode={i18n.language}
      locales={locales}
      onLocaleChange={onLocaleChange}
      {...props}
    />
  )
}

