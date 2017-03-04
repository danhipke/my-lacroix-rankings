import request from 'superagent'

export const SUBMIT_RANKING_DATA = 'SUBMIT_RANKING_DATA'
export const SUBMIT_RANKING_DATA_FAILURE = 'SUBMIT_RANKING_DATA_FAILURE'
export const SUBMIT_RANKING_DATA_SUCCESS = 'SUBMIT_RANKING_DATA_SUCCESS'
export const GET_RANKING_DATA = 'GET_RANKING_DATA'
export const GET_RANKING_DATA_FAILURE = 'GET_RANKING_DATA_FAILURE'
export const GET_RANKING_DATA_SUCCESS = 'GET_RANKING_DATA_SUCCESS'

export function submitRankingData (value) {
  return {
    type: SUBMIT_RANKING_DATA,
    payload: value
  }
}

export function getRankingData (value) {
  return {
    type: GET_RANKING_DATA,
    payload: value
  }
}

// TODO: figure out if some of this should be moved to rankings module
const rankingsService = store => next => action => {
  next(action)
  switch (action.type) {
    case SUBMIT_RANKING_DATA: {
      const rankings = action.payload.rankings
      const userId = action.payload.userId
      const hasRankedBefore = action.payload.hasRankedBefore
      let rankingsPostData = rankings.map((ranking) => (
        {
          id: ranking.id,
          rank: ranking.rank
        })
      )
      if (!hasRankedBefore) {
        request.post('/api/rankings')
        .set('Content-Type', 'application/json')
        .send({ userId: userId, rankings: rankingsPostData })
        .end((err, res) => {
          if (err) {
            return next({
              type: SUBMIT_RANKING_DATA_FAILURE,
              payload: err
            })
          }
          const data = JSON.parse(res.text)
          next({
            type: SUBMIT_RANKING_DATA_SUCCESS,
            payload: data
          })
        })
      } else {
        request.put('/api/rankings')
        .set('Content-Type', 'application/json')
        .send({ userId: userId, rankings: rankingsPostData })
        .end((err, res) => {
          if (err) {
            return next({
              type: SUBMIT_RANKING_DATA_FAILURE,
              payload: err
            })
          }
          const data = JSON.parse(res.text)
          next({
            type: SUBMIT_RANKING_DATA_SUCCESS,
            payload: data
          })
        })
      }
      break
    }
    case GET_RANKING_DATA: {
      const userId = action.payload
      request.get(`/api/rankings/${userId}`)
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

export default rankingsService
