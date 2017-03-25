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
        imageSrc: result.image_src,
        color: result.color
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
  rankingTotals: [ ]
}

export default function resultsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
