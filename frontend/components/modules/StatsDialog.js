import {createUseStyles} from 'react-jss'
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography} from '@mui/material'

const useStyles = createUseStyles({
  title: {}
})

export default function StatsDialog({open, onClose, objectCount, clearObjects}) {
  const classes = useStyles()

  const onClearButtonClick = () => {
    clearObjects()
    onClose()
  }

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle className={classes.title}>統計</DialogTitle>
      <DialogContent dividers>
        <Typography>你丟了： {objectCount} 次</Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={onClearButtonClick}>清空</Button>
        <Button variant="contained" autoFocus onClick={onClose}>確認</Button>
      </DialogActions>
    </Dialog>
  )
}
