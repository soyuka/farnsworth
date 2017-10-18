const {combineReducers} = require('redux')
const layout = require('./layout').default
const grid = require('./grid').default
const config = require('./config').default

module.exports = combineReducers({
  config, grid, layout
})
