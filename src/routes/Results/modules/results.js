import { GET_RESULTS_SUCCESS,
        GET_RESULTS_ERROR } from '../../../services/resultsService'

// ------------------------------------
// Constants
// ------------------------------------

// ------------------------------------
// Actions
// ------------------------------------

export const actions = { }

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_RESULTS_SUCCESS]: (state, action) => {
    const results = action.payload.results

    let newResults = results.map((result) => (
      {
        id: result.id,
        name: result.name,
        total: result.total,
        imageSrc: result.image_src
      }
    )).sort((a, b) =>
      a.total - b.total
    )

    return Object.assign({}, state, {
      rankingTotals: newResults
    })
  },
  [GET_RESULTS_ERROR]: (state, action) => {
    // TODO: Handle this error
    return state
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  // For now, leave default rankings here. May be worth loading from DB at some
  // point, but this will minimize DB queries
  rankingTotals: [ ]
}

export default function rankingsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
