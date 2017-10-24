import * as uuid from 'uuid/v1'
import { Action } from 'redux'
import { Epic } from 'redux-observable'
import { Observable } from 'rxjs/Rx'
// import {render} from 'choo-redux'

// import {setupElement} from '../lib/graphic'

import {getElement} from '../elements'

// const CHOOSE_CONTAINER = '[Layout] Choose container'
const PICK_ROW = '[Layout] Pick row'
const PICK_COLUMN = '[Layout] Pick column'
const CHOOSE_NOTHING = '[Layout] Choose nothing'
const UPDATE_FRAGMENT = '[Layout] Update fragment'
// const ADD_ELEMENT = '[Layout] Add Element'
const SELECT_ELEMENT = '[Layout] Select Element'
const SELECT_NOTHING = '[Layout] Select Nothing'

const fragment = {byId: {}, allIds: []}
const root = []

export type LayoutState = {
  element: null | string
  current: null | string
  selected: null | string
  fragment: any,
  root: Element[]
}

const initialState = {
  element: null,
  current: null,
  selected: null,
  fragment,
  root
}

/**
 * Action creators
 */
// export function ChooseContainer(payload = {}) {
//   return {type: CHOOSE_CONTAINER, render: true}
// }

export function PickRow() {
 return {type: PICK_ROW, render: true}
}

export function PickColumn() {
 return {type: PICK_COLUMN, render: true}
}

// export function ChooseNothing() {
//   return {type: CHOOSE_NOTHING}
// }

export function UpdateFragment(fragment) {
  return {
    type: UPDATE_FRAGMENT,
    render: true,
    fragment
  }
}

// @TODO select nothing
export class SelectElement {
  type = SELECT_ELEMENT
  render = true

  constructor(public target) {}
}

export class SelectNothing {
  type = SELECT_NOTHING
  render = true
}

export function AddElement({target}) {
  return function (dispatch, getState) {
    const key = uuid()
    const state = getState()

    const element = getElement({key, state, element: state.layout.current})

    if (!target || !target.id) {
      throw new Error('No parent')
    }

    if (target.id === 'blueprint') {
      element.parent = target
      fragment.byId[key] = element
      fragment.allIds.push(key)
      root.push(element)
    } else {
      element.parent = target
      fragment.byId[target.id].appendChild(element)
      fragment.byId[key] = element
      fragment.allIds.push(key)
    }

    // setupElement({element, state, dispatch})
    //dispatch(new ChooseNothing())
    dispatch(UpdateFragment(fragment))
  }
}

/**
 * Reducer
 */
export default function layout (state = initialState, action) {
  switch (action.type) {
    case PICK_ROW: {
      return { ...state, current: 'row' }
    }

    case PICK_COLUMN: {
      return { ...state, current: 'column' }
    }

    case CHOOSE_NOTHING: {
      return { ...state, current: null }
    }

    case UPDATE_FRAGMENT: {
      return { ...state, fragment: action.fragment }
    }

    case SELECT_ELEMENT: {
      //document.getElementById(action.target.id).classList.add('farnsworth-selected')
      //return { ...state, selected: action.target.id }
      return {...state}
    }

    case SELECT_NOTHING: {
      [].slice.call(document.querySelectorAll('.farnsworth-selected')).forEach((e) => {
        e.classList.remove('farnsworth-selected')
      })

      return { ...state, selected: null }
    }

    default:
      return state
  }
}

export const selectElementEpic$: Epic<any, LayoutState, null> = (action$, store) => {
  console.log(action$)
  return Observable.empty() as Observable<Action>
  // return action$.ofType(SELECT_ELEMENT)
  // .do(() => {
  //
  // })
}
