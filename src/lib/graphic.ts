import Resizable from 'resizable'

function closest(v, grid) {
  let i = 0
  let num

  while(i < grid - 1) {
    num = v + i
    if (num % grid === 0) {
      break
    }

    num = v - i
    if (num % grid === 0) {
      break
    }

    i++
  }

  return num
}

function nextClassOnGrid(size, breakpoints = {}) {
  const sizes = []

  for (let i in breakpoints) {
    sizes.push({num: +breakpoints[i] - size, class: i})
  }

  sizes.sort((a, b) => {
    return Math.abs(a.num) - Math.abs(b.num)
  })

  return sizes[0].class
}

export function setupElement({element, state, dispatch}) {
  const factor = state.grid.factor
  const resizable = new Resizable(element, {
    within: element.parent,
    // handles: 's, se, e',
    threshold: 10,
    draggable: true
  });

  // Override move @TODO refactor
  const move = resizable.draggable.move

  function moveGrid(x, y) {
    move.call(this, x, y)

    if (this.prevX % factor !== 0) {
      x = closest(this.prevX, factor)
    }

    if (this.prevX % factor !== 0) {
      y = closest(this.prevY, factor)
    }

    if (x !== this.prevX || y !== this.prevY) {
      this.setCoords(x, y)
    }
  }

  resizable.draggable.move = moveGrid.bind(resizable.draggable)

  resizable.on('resize', function() {
    let height = parseInt(this.element.style.height.replace('px', ''))
    let width = parseInt(this.element.style.width.replace('px', ''))

    if (height % factor !== 0) {
      this.element.style.height = `${closest(height, factor)}px`
    }

    this.element.style.width = ''
    this.element.classList.remove.apply(this.element.classList, state.grid.breakpoints.allIds)
    const cl = nextClassOnGrid(width, state.grid.breakpoints.byId)
    this.element.classList.add(cl)
    //console.log(`#${this.element.id}:before { content:"${state.grid.breakpoints.text[cl]}" }`)
  })

  return resizable
}
