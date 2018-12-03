const initialState = {
  isAuthenticated: false,
  user: {}
}

export default (state = initialState, action) => {
  switch(action.type) {
    case 'GET_ACC':
      if (action.payload.fail) {
        return {
          isAuthenticated: false,
          user: {}
        }
      } else {
          return {
            isAuthenticated: true,
            user: action.payload
          }
      }
    default:
      return state;
  }
}
