import React from 'react'
import {createUseStyles} from 'react-jss'
import {MenuItem, TextField} from '@mui/material'

const useStyles = createUseStyles((theme) => ({
  root: {
    display: 'inline-block',
  },

  textField: {
    background: 'white',
    borderRadius: 4,
  },
}))


export default function Select({className, currentValue, selections, onSelectionChange}) {
  const classes = useStyles()

  const onChange = (event) => {
    onSelectionChange(event.target.value)
  }

  return (
    <div className={`${classes.root} ${className}`}>
      <TextField className={classes.textField} size="small" select value={currentValue} variant="outlined" onChange={onChange}>
        {selections.map(selection => (
          <MenuItem
            key={selection.key}
            disabled={selection.disabled}
            value={selection.value}>{selection.label}</MenuItem>
        ))}
      </TextField>
    </div>
  )
}
