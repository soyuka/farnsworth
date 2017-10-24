import html from 'choo/html'

export default function column({key, state}) {
  return html`<div class="col farnsworth-container-column" id="${key}"></div>`
}
