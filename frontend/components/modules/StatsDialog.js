import {createUseStyles} from 'react-jss'
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography} from '@mui/material'
import {useTranslation} from 'next-i18next'

const useStyles = createUseStyles({
  title: {}
})

export default function StatsDialog({open, onClose, objectCount, clearObjects}) {
  const classes = useStyles()
  const {t} = useTranslation()

  const onClearButtonClick = () => {
    clearObjects()
    onClose()
  }

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle className={classes.title}>{t('Stats')}</DialogTitle>
      <DialogContent dividers>
        <Typography>{t('Your rolling times is {{count}}', {count: objectCount})}</Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={onClearButtonClick}>{t('Clear')}</Button>
        <Button variant="contained" autoFocus onClick={onClose}>{t('Close')}</Button>
      </DialogActions>
    </Dialog>
  )
}
