import { combineReducers } from 'redux'
import { combineEpics } from 'redux'

import layout, { selectElementEpic } from './layout.js'
import grid from './grid.js'
import tool from './tool.js'

export const rootReducer = combineReducers({
  grid, layout, tool
})

export const rootEpic = combineEpics(selectElementEpic)
