import request from 'superagent'

export const GET_RESULTS = 'GET_RESULTS'
export const GET_RESULTS_SUCCESS = 'GET_RESULTS_SUCCESS'
export const GET_RESULTS_ERROR = 'GET_RESULTS_ERROR'

export function getResults (value) {
  return {
    type: GET_RESULTS,
    payload: value
  }
}

const resultsService = store => next => action => {
  next(action)
  switch (action.type) {
    case GET_RESULTS: {
      request.get(`/api/results`)
      .end((err, res) => {
        if (err) {
          return next({
            type: GET_RESULTS_ERROR,
            payload: err
          })
        } else {
          const data = JSON.parse(res.text)
          next({
            type: GET_RESULTS_SUCCESS,
            payload: data
          })
        }
      })
      break
    }
    default:
      break
  }
}

export default resultsService
