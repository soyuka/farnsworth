import html from 'choo/html'

const TITLE = '🚂🚋🚋 - route not found'

export default function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)
  return html`
    <body class="sans-serif">
      <h1 class="f-headline pa3 pa4-ns">
        404 - route not found
      </h1>
      <a href="/" class="link black underline">
        Back to main
      </a>
    </body>
  `
}
