declare function require(name: string)
declare var process: any
declare var module: any

import * as choo from 'choo'
import * as css from 'sheetify'
import { chooMiddleware, patchRouter } from 'choo-redux'
import { logger } from 'redux-logger'
import thunk from 'redux-thunk'
import { createEpicMiddleware } from 'redux-observable'
import { createStore, applyMiddleware, compose } from 'redux'
import { rootReducer, rootEpic } from './ducks'

import mainView from './views/main'
import notFoundView from './views/404'

css('bootstrap')
css('../style.css')

const app = new choo({})
if (process.env.NODE_ENV !== 'production') {
  app.use(require('choo-devtools')())
  app.use(require('choo-log')())
} else {
  // Enable once you want service workers support. At the moment you'll
  // need to insert the file names yourself & bump the dep version by hand.
  // app.use(require('choo-service-worker')())
}

const composeEnhancers = typeof window === 'object' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
	(window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
		// Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
	}) : compose;

const enhancer = composeEnhancers(applyMiddleware(logger, chooMiddleware(app), thunk, createEpicMiddleware(rootEpic)))
const store = createStore(rootReducer, {}, enhancer)
patchRouter(app, store)

app.route('/', mainView)
app.route('/*', notFoundView)

app.use(function (state, emitter) {
  emitter.on('DOMContentLoaded', function() {
  })
})

if (!module.parent) app.mount('body')
else module.exports = app
