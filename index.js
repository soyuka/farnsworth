const PIXI = require('pixi.js')

const BLUEPRINT_WIDTH = 1024
const BLUEPRINT_HEIGHT = 1024

const app = new PIXI.Application(BLUEPRINT_WIDTH, BLUEPRINT_HEIGHT, {backgroundColor: 0x2B71B7})
document.body.appendChild(app.view)

// const text = new PIXI.Text('Hello World')
// app.stage.addChild(text)

/**
 * Draw 10px grid
 */
function buildGrid (gap = 30) {
  const grid = new PIXI.Graphics()
  grid.lineStyle(1, 0x5586C4)

  const numX = BLUEPRINT_WIDTH / gap
  const numY = BLUEPRINT_HEIGHT / gap

  for (let j = 0; j < numY; j++) {
    for (let i = 0; i < numX; i++) {
      grid.drawRect(i * gap, j * gap, gap, gap)
    }
  }

  app.stage.addChild(grid)
}

buildGrid()
