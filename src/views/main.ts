import html from 'choo/html'
import {changeDOMTitle} from 'choo-redux'
// import {AddElement, SelectElement, SelectNothing} from '../ducks/layout'
import {AddElement} from '../ducks/layout'
import topbar from '../partial/topbar'

const TITLE = '🚂🚋🚋'

function getTargetThatHasId(target) {
  while(target && !target.id) {
    target = target.parentElement
  }

  return target
}

export default function view (state, dispatch) {
  if (state.title !== TITLE) {
    dispatch(changeDOMTitle(TITLE))
  }

  function clickBlueprint(event) {
    const target = getTargetThatHasId(event.target)

    if (!target) {
      return
    }

    if (state.layout.current) {
      dispatch(AddElement({target}))
      return
    }

    // if (target.id === 'blueprint') {
    //   if(state.layout.selected) {
    //     dispatch(SelectNothing())
    //   }
    //   return
    // }
    //
    // if (target.id !== state.layout.selected ) {
    //   dispatch(SelectElement({target}))
    // }
  }

  const root = state.layout.root

  return html`
  <body>
    ${topbar(state, dispatch)}
    <div id="blueprint" class="farnsworth-blueprint ${state.layout.element ? 'farnsworth-has-element' : ''}" style="width: ${state.grid.width}; min-height: ${state.grid.height};" onclick=${clickBlueprint}>
      ${root.map(e => {
        return e
      })}
      <div class="farnsworth-grid">
        ${state.grid.lines.map(e => state.grid.columns.map((e) => {
          const el = html`<div style="width: ${state.grid.size};height: ${state.grid.size};" class="farnsworth-column"></div>`

          el.isSameNode = function (target) {
            return true
          }

          return el
        }))}
      </div>
    </div>
  </body>
  `
}
