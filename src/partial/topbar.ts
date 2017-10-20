import html from 'choo/html'

export default function topbar (state, dispatch) {
  return html`
  <header class="farnsworth-topbar">
    <nav class="w-100 ph3 pv3">
      <a class="mr3 dib"><a class="f6 link dim br2 ph3 pv2 mb2 dib white bg-navy ${state.tool.active === 'selection' ? 'active' : ''}" onclick=${selectionTool()}>Selection</a></a>
      <a class="mr3 dib"><button onclick=${resizeTool()}>Resize Tool</button></a>
      <a class="mr3 dib"><button onclick=${chooseContainer()}>Container</button></a>
    </nav>
  </header>
  `

  function selectionTool () {
  }

  function resizeTool () {
  }

  function chooseContainer () {
  }
}
