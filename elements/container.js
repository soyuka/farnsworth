const html = require('choo/html')

module.exports = container

function container({key, state}) {
  return html`<div id="${key}" key="${key}" class="farnsworth-container app-container" style="min-height: ${state.grid.factor}px; width: ${state.grid.factor*5}px"></div>`
}
