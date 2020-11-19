import {ADD_ITEM, SET_ITEMS} from './types'

const initialState = {
  items: []
}

export const reducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_ITEMS:
      return {...state, items: action.payload}
    case ADD_ITEM:
      return {...state, items: [...state.items, action.payload]}
    default:
      return state
  }
}

