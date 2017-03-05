import request from 'superagent'

export const SUBMIT_RANKINGS = 'SUBMIT_RANKINGS'
export const SUBMIT_RANKINGS_ERROR = 'SUBMIT_RANKINGS_ERROR'
export const SUBMIT_RANKINGS_SUCCESS = 'SUBMIT_RANKINGS_SUCCESS'
export const GET_RANKINGS = 'GET_RANKINGS'
export const GET_RANKINGS_ERROR = 'GET_RANKINGS_ERROR'
export const GET_RANKINGS_SUCCESS = 'GET_RANKINGS_SUCCESS'
export const GET_RANKINGS_DOESNT_EXIST = 'GET_RANKINGS_DOESNT_EXIST'

export function submitRankings (value) {
  return {
    type: SUBMIT_RANKINGS,
    payload: value
  }
}

export function getRankings (value) {
  return {
    type: GET_RANKINGS,
    payload: value
  }
}

const rankingsService = store => next => action => {
  next(action)
  switch (action.type) {
    case SUBMIT_RANKINGS: {
      const flavors = action.payload.flavors
      const userId = action.payload.userId
      const hasRankedBefore = action.payload.hasRankedBefore
      let flavorsPostData = flavors.map((flavor) => (
        {
          id: flavor.id,
          rank: flavor.rank
        })
      )
      if (!hasRankedBefore) {
        request.post('/api/rankings')
        .set('Content-Type', 'application/json')
        .send({ userId: userId, flavors: flavorsPostData })
        .end((err, res) => {
          if (err) {
            return next({
              type: SUBMIT_RANKINGS_ERROR,
              payload: err
            })
          }
          const data = JSON.parse(res.text)
          next({
            type: SUBMIT_RANKINGS_SUCCESS,
            payload: data
          })
        })
      } else {
        request.put('/api/rankings')
        .set('Content-Type', 'application/json')
        .send({ userId: userId, flavors: flavorsPostData })
        .end((err, res) => {
          if (err) {
            return next({
              type: SUBMIT_RANKINGS_ERROR,
              payload: err
            })
          }
          const data = JSON.parse(res.text)
          next({
            type: SUBMIT_RANKINGS_SUCCESS,
            payload: data
          })
        })
      }
      break
    }
    case GET_RANKINGS: {
      const userId = action.payload
      request.get(`/api/rankings/${userId}`)
      .end((err, res) => {
        if (res.notFound) {
          return next({
            type: GET_RANKINGS_DOESNT_EXIST
          })
        } else if (err) {
          return next({
            type: GET_RANKINGS_ERROR,
            payload: err
          })
        } else {
          const data = JSON.parse(res.text)
          next({
            type: GET_RANKINGS_SUCCESS,
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

export default rankingsService
