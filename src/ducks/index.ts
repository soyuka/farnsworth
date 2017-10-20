import { combineReducers } from 'redux'
import { combineEpics } from 'redux-observable'

import layout, { selectElementEpic$ } from './layout'
import grid from './grid'
import tool from './tool'

export const rootReducer = combineReducers({
  grid, layout, tool
})

export const rootEpic = combineEpics(selectElementEpic$)
