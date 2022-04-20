import {createTheme} from '@mui/material'
import {indigo, deepPurple} from '@mui/material/colors'

const theme = createTheme({
  palette: {
    primary: {
      main: indigo[600],
    },
    secondary: {
      main: deepPurple[600],
    },
  },
})

export default theme
