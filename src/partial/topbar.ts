import html from 'choo/html'
import {PickRow, PickColumn} from '../ducks/layout'

export default function topbar (state, dispatch) {
  return html`
  <header class="farnsworth-topbar">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <ul class="navbar-nav">
        <li class="nav-item ${state.tool.active === 'selection' ? 'active' : ''}">
          <a class="nav-link" onclick=${selectionTool()}>Selection</a>
        </li>
        <li class="nav-item ${state.tool.active === 'resize' ? 'active' : ''}">
          <a class="nav-link" onclick=${resizeTool()}>Resize</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" onclick=${pickRow}>Row</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" onclick=${pickColumn}>Column</a>
        </li>
      </ul>
    </nav>
  </header>
  `

  function selectionTool () {
  }

  function resizeTool () {
  }

  function pickRow () {
    dispatch(PickRow())
  }

  function pickColumn () {
    dispatch(PickColumn())
  }
}
