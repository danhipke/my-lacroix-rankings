import request from 'superagent'

export const CREATE_USER = 'CREATE_USER'
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS'
export const CREATE_USER_FAILURE = 'CREATE_USER_FAILURE'
export const CHECK_USER_EXISTS = 'CHECK_USER_EXISTS'

export function createUser (value) {
  return {
    type: CREATE_USER,
    payload: value
  }
}

const userService = store => next => action => {
  next(action)
  switch (action.type) {
    case CREATE_USER: {
      const userId = action.payload
      request.post(`/api/users`)
      .set('Content-Type', 'application/json')
      .send({ id: userId })
      .end((err, res) => {
        if (err) {
          return next({
            type: CREATE_USER_FAILURE,
            payload: err
          })
        }
        const data = JSON.parse(res.text)
        next({
          type: CREATE_USER_SUCCESS,
          payload: data
        })
      })
      break
    }
    case CHECK_USER_EXISTS: {
      const userId = action.payload
      request.get(`/api/users/${userId}`)
      .end((err, res) => {
        if (err) {
          return next({
            type: GET_RANKING_DATA_FAILURE,
            payload: err
          })
        }
        const data = JSON.parse(res.text)
        next({
          type: GET_RANKING_DATA_SUCCESS,
          payload: data
        })
      })
      break
    }
    default:
      break
  }
}

export default userService
