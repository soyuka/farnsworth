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
    byId: {
      'w1': factor,
      'w2': factor*2,
      'w3': factor*3,
      'w4': factor*4,
      'w5': factor*5,
      'w-10': (10 * screenWidth ) / 100,
      'w-20': (20 * screenWidth ) / 100,
      'w-25': (25 * screenWidth ) / 100,
      'w-30': (30 * screenWidth ) / 100,
      'w-33': (33 * screenWidth ) / 100,
      'w-34': (34 * screenWidth ) / 100,
      'w-40': (40 * screenWidth ) / 100,
      'w-50': (50 * screenWidth ) / 100,
      'w-60': (60 * screenWidth ) / 100,
      'w-70': (70 * screenWidth ) / 100,
      'w-75': (75 * screenWidth ) / 100,
      'w-80': (80 * screenWidth ) / 100,
      'w-90': (90 * screenWidth ) / 100,
      'w-100': (100 * screenWidth ) / 100,
    },
    text: {
      'w1': '1em',
      'w2': '2em',
      'w3': '3em',
      'w4': '4em',
      'w5': '5em',
      'w-10': '10%',
      'w-20': '20%',
      'w-25': '25%',
      'w-30': '30%',
      'w-33': '33%',
      'w-34': '34%',
      'w-40': '40%',
      'w-50': '50%',
      'w-60': '60%',
      'w-70': '70%',
      'w-75': '75%',
      'w-80': '80%',
      'w-90': '90%',
      'w-100': '100%'
    }
  },
}

initialState.breakpoints.allIds = Object.keys(initialState.breakpoints.byId)

export default function grid (state = initialState, action) {
  switch (action.type) {
    // case GRID_COLUMNS: {
    //   return { ...state, columns: new Array(action.payload.size).fill(0) }
    // }

    default:
      return state
  }
}
