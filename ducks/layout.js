const uuid = require('uuid/v1')
const {render} = require('choo-redux')

const {setupElement} = require('../lib/graphic')

const CHOOSE_CONTAINER = '[Layout] Choose container'
const CHOOSE_NOTHING = '[Layout] Choose nothing'
const UPDATE_FRAGMENT = '[Layout] Update fragment'
const ADD_ELEMENT = '[Layout] Add Element'
const SELECT_ELEMENT = '[Layout] Select Element'
const SELECT_NOTHING = '[Layout] Select Nothing'

const fragment = {byId: {}, allIds: []}
const initialState = {
  element: null,
  current: null,
  selected: null,
  fragment
}

/**
 * Action creators
 */
export function ChooseContainer(payload = {}) {
  return {type: CHOOSE_CONTAINER, render: true}
}

export function ChooseNothing() {
  return {type: CHOOSE_NOTHING}
}

export function UpdateFragment(fragment) {
  return {type: UPDATE_FRAGMENT, fragment, render: true}
}

// @TODO select nothing
export function SelectElement({target}) {
  return {type: SELECT_ELEMENT, target, render: true}
}

export function SelectNothing() {
  return {type: SELECT_NOTHING, render: true}
}

export function AddElement({target}) {
  return function (dispatch, getState) {
    const key = uuid()
    const state = getState()

    const element = require('../elements/container.js')({key, state})

    if (!target || !target.id) {
      throw new Error('No parent')
    }

    if (target.id === 'blueprint') {
      element.parent = target
      fragment.byId[key] = element
      fragment.allIds.push(key)
    } else {
      element.parent = target
      fragment.byId[target.id].appendChild(element)
    }

    setupElement({element, state, dispatch})
    dispatch(ChooseNothing())
    dispatch(UpdateFragment(fragment))
  }
}

/**
 * Reducer
 */
export default function layout (state = initialState, action) {
  switch (action.type) {
    case CHOOSE_CONTAINER: {
      return { ...state, current: 'container' }
    }

    case CHOOSE_NOTHING: {
      return { ...state, current: null }
    }

    case UPDATE_FRAGMENT: {
      return { ...state, fragment: action.fragment }
    }

    case SELECT_ELEMENT: {
      document.getElementById(action.target.id).classList.add('farnsworth-selected')
      return { ...state, selected: action.target.id }
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

export const selectElementEpic$ = (action$, store) => {
  action$.ofType(SELECT_ELEMENT)
  .do(() => {

  })
}
