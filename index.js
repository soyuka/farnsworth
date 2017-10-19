const choo = require('choo')
const css = require('sheetify')
const {chooMiddleware, patchRouter} = require('choo-redux')
const { logger } = require('redux-logger')
const thunk = require('redux-thunk').default
import { createEpicMiddleware } from 'redux-observable'

const { createStore, applyMiddleware, compose } = require('redux')
const { rootReducer, rootEpic } = require('./ducks/index.js')

css('tachyons')
css('./style.css')

const app = choo()
if (process.env.NODE_ENV !== 'production') {
  app.use(require('choo-devtools')())
  app.use(require('choo-log')())
} else {
  // Enable once you want service workers support. At the moment you'll
  // need to insert the file names yourself & bump the dep version by hand.
  // app.use(require('choo-service-worker')())
}

const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
	window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
		// Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
	}) : compose;

const enhancer = composeEnhancers(applyMiddleware(logger, chooMiddleware(app), thunk, createEpicMiddleware))
const store = createStore(rootReducer, {}, enhancer)
patchRouter(app, store)

app.route('/', require('./views/main'))
app.route('/*', require('./views/404'))

app.use(function (state, emitter) {
  emitter.on('DOMContentLoaded', function() {
  })
})

if (!module.parent) app.mount('body')
else module.exports = app
