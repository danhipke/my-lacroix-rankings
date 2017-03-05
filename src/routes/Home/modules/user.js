import { CREATE_USER_SUCCESS,
        CREATE_USER_FAILURE } from '../../../services/userService'

// ------------------------------------
// Constants
// ------------------------------------
export const SET_USER_ID = 'SET_USER_ID'

// ------------------------------------
// Actions
// ------------------------------------
export function setUserId (value) {
  return {
    type: SET_USER_ID,
    payload: value
  }
}

export const actions = {
  setUserId
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_USER_ID]: (state, action) => {
    return Object.assign({}, state, {
      userId: action.payload
    })
  },
  [CREATE_USER_SUCCESS]: (state, action) => {
    return Object.assign({}, state, {
      userId: action.payload.userId
    })
  },
  [CREATE_USER_FAILURE]: (state, action) => {
    // TODO: Handle this error
    return state
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  userId: null
}

export default function userReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
