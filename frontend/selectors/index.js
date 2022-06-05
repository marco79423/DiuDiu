import {createEntityAdapter} from '@reduxjs/toolkit'

const entityAdapter = createEntityAdapter()

export const selectDeveloperMode = state => state.app.developerMode

const objectSelectors = entityAdapter.getSelectors((state) => state.object)
export const selectObjectIdList = state => objectSelectors.selectIds(state)
export const selectObjectList = state => objectSelectors.selectAll(state)
export const selectObject = objectId => state => objectSelectors.selectById(state, objectId)
export const selectObjectCount = state => objectSelectors.selectTotal(state)
