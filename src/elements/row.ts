import html from 'choo/html'

export default function row({key, state}) {
  return html`<div class="row farnsworth-container" id="${key}"></div>`
}
