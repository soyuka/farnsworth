const GRID_COLUMNS = 'GRID_COLUMNS'

// rem unit
const factor = parseFloat(getComputedStyle(document.documentElement).fontSize)

// function convertRemToPixels(rem) {
//   return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
// }

export function setGridColumns(payload = {number: 0}) {
  return { type: GRID_COLUMNS, payload }
}

const screenWidth = 1280

const initialState = {
  factor: factor,
  columns: new Array(screenWidth / factor).fill(0),
  lines: new Array(Math.floor(document.documentElement.clientHeight / factor)).fill(0),
  size: '1rem',
  width: `${Math.floor(screenWidth / factor)}rem`,
  height: `${document.documentElement.clientHeight / factor}rem`,
  breakpoints: {
    1: 'w5',
    [(10 * screenWidth ) / 100]: 'w10',
    [(20 * screenWidth ) / 100]: 'w20',
    [(25 * screenWidth ) / 100]: 'w25',
    [(30 * screenWidth ) / 100]: 'w30',
    [(33 * screenWidth ) / 100]: 'w33',
    [(34 * screenWidth ) / 100]: 'w34',
    [(40 * screenWidth ) / 100]: 'w40',
    [(50 * screenWidth ) / 100]: 'w50',
    [(60 * screenWidth ) / 100]: 'w60',
    [(70 * screenWidth ) / 100]: 'w70',
    [(75 * screenWidth ) / 100]: 'w75',
    [(80 * screenWidth ) / 100]: 'w80',
    [(90 * screenWidth ) / 100]: 'w90',
    [(100 * screenWidth ) / 100]: 'w100'
  }
}

export default function grid (state = initialState, action) {
  switch (action.type) {
    // case GRID_COLUMNS: {
    //   return { ...state, columns: new Array(action.payload.size).fill(0) }
    // }

    default:
      return state
  }
}
