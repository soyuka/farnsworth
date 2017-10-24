import row from './row'
import column from './column'

export const getElement = function ({key, state, element}) {
  switch(element) {
    case 'row':
      return row({key, state})
    case 'column':
      return column({key, state})
  }

}
