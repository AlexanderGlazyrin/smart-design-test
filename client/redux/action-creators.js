import {ADD_ITEM, SET_ITEMS} from './types';

export const setItemsAC = (payload) => {
  return {
    type: SET_ITEMS,
    payload
  }
}

export const loadItemsAC = () => {
  return async (dispatch) => {
    const res = await (await fetch('http://localhost:3001/market')).json();
    dispatch(setItemsAC(res.items))
  }
}

export const addItemAC = (payload) => {
  return {
    type: ADD_ITEM,
    payload
  }
}

export const createItemAC = (payload) => {
  return async (dispatch) => {
    const {itemName, description} = payload;
    const res = await(await fetch('http://localhost:3001/new-item', {
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({itemName, description})
    })).json()
    dispatch(addItemAC(res.item));
  }
}

