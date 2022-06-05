import {useDispatch, useSelector} from 'react-redux'

import objectSlice from '../slices/object'
import {selectObjectCount} from '../selectors'
import StatsDialog from '../components/modules/StatsDialog'


export default function StatsDialogContainer({open, onClose}) {
  const dispatch = useDispatch()

  const objectCount = useSelector(selectObjectCount)

  const clearObjects = () => {
    dispatch(objectSlice.actions.removeAll())
  }

  return (
    <StatsDialog
      open={open}
      onClose={onClose}
      objectCount={objectCount}
      clearObjects={clearObjects}
    />
  )
}
