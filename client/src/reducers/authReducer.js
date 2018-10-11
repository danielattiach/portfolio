import { GET_ACC } from '../actions/types';

const initialState = {
  isAuthenticated: false,
  user: {}
}

export default (state = initialState, action) => {
  switch(action.type) {
    case GET_ACC:
      if (action.payload.fail) {
        return {
          ...state,
          isAuthenticated: false,
          user: {}
        }
      } else {
        return {
          ...state,
          isAuthenticated: true,
          user: action.payload
        }
      }
    default:
      return state;
  }
}
