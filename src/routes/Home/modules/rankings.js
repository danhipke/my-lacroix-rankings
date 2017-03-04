import _ from 'lodash'

import { GET_RANKING_DATA_FAILURE,
        GET_RANKING_DATA_SUCCESS,
        SUBMIT_RANKING_DATA_FAILURE,
        SUBMIT_RANKING_DATA_SUCCESS } from '../../../services/rankingsService'

// ------------------------------------
// Constants
// ------------------------------------
export const RANKINGS_REORDER_ITEM = 'RANKINGS_REORDER_ITEM'

// ------------------------------------
// Actions
// ------------------------------------
export function rankingsReorderItems (value) {
  return {
    type: RANKINGS_REORDER_ITEM,
    payload: value
  }
}

export const actions = {
  rankingsReorderItems
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [RANKINGS_REORDER_ITEM]: (state, action) => {
    const reorder = action.payload
    const reorderItem = state.rankings[reorder.startIndex]
    let newRankings = []
    state.rankings.map((item, i) => {
      if (i === reorder.startIndex) {
        return
      }

      if (reorder.endIndex < reorder.startIndex) {
        if (i === reorder.endIndex) {
          newRankings.push(reorderItem)
        }
        newRankings.push(item)
      } else {
        newRankings.push(item)
        if (i === reorder.endIndex) {
          newRankings.push(reorderItem)
        }
      }
    })

    newRankings = newRankings.map((item, i) => {
      return Object.assign({}, item, { rank: i + 1 })
    })

    return Object.assign({}, state, {
      rankings: newRankings
    })
  },
  [GET_RANKING_DATA_SUCCESS]: (state, action) => {
    const rankings = action.payload.rankings
    const currentRankings = state.rankings

    // TODO: Figure out better way to updating ranking
    let newRankings = _.map(currentRankings, (obj) =>
      _.assign(obj, _.find(rankings, { flavor_id: obj.id }))
    ).sort((a, b) =>
      a.rank - b.rank
    )

    return Object.assign({}, state, {
      hasRankedBefore: true,
      rankings: newRankings
    })
  },
  [GET_RANKING_DATA_FAILURE]: (state, action) => {
    // TODO: Handle this error
    return state
  },
  [SUBMIT_RANKING_DATA_FAILURE]: (state, action) => {
    // TODO: Handle this error
    return state
  },
  [SUBMIT_RANKING_DATA_SUCCESS]: (state, action) => {
    return Object.assign({}, state, {
      hasRankedBefore: true
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  hasRankedBefore: false,
  rankings: [
    {
      id: 'apricot',
      flavor: 'Apricot',
      rank: 1,
      imageSrc: '/images/apricot.png'
    },
    {
      id: 'berry',
      flavor: 'Berry',
      rank: 2,
      imageSrc: '/images/berry.png'
    },
    {
      id: 'cerise-limon',
      flavor: 'Cerise Limón',
      rank: 3,
      imageSrc: '/images/cerise-limon.png'
    },
    {
      id: 'coconut',
      flavor: 'Coconut',
      rank: 4,
      imageSrc: '/images/coconut.png'
    },
    {
      id: 'cran-raspberry',
      flavor: 'Cran-Raspberry',
      rank: 5,
      imageSrc: '/images/cran-raspberry.png'
    },
    {
      id: 'kiwi-sandia',
      flavor: 'Kiwi Sandía',
      rank: 6,
      imageSrc: '/images/kiwi-sandia.png'
    },
    {
      id: 'lacola',
      flavor: 'LaCola',
      rank: 7,
      imageSrc: '/images/lacola.png'
    },
    {
      id: 'lemon',
      flavor: 'Lemon',
      rank: 8,
      imageSrc: '/images/lemon.png'
    },
    {
      id: 'lime',
      flavor: 'Lime',
      rank: 9,
      imageSrc: '/images/lime.png'
    },
    {
      id: 'mango',
      flavor: 'Mango',
      rank: 10,
      imageSrc: '/images/mango.png'
    },
    {
      id: 'melon-pomelo',
      flavor: 'Melón Pomelo',
      rank: 11,
      imageSrc: '/images/melon-pomelo.png'
    },
    {
      id: 'mure-pepino',
      flavor: 'Muré Pepino',
      rank: 12,
      imageSrc: '/images/mure-pepino.png'
    },
    {
      id: 'orange',
      flavor: 'Orange',
      rank: 13,
      imageSrc: '/images/orange.png'
    },
    {
      id: 'pamplemousse',
      flavor: 'Pamplemousse',
      rank: 14,
      imageSrc: '/images/pamplemousse.png'
    },
    {
      id: 'passionfruit',
      flavor: 'Passionfruit',
      rank: 15,
      imageSrc: '/images/passionfruit.png'
    },
    {
      id: 'peach-pear',
      flavor: 'Peach Pear',
      rank: 16,
      imageSrc: '/images/peach-pear.png'
    },
    {
      id: 'pina-fraise',
      flavor: 'Piña Fraise',
      rank: 17,
      imageSrc: '/images/pina-fraise.png'
    },
    {
      id: 'pomme-baya',
      flavor: 'Pomme Bayá',
      rank: 18,
      imageSrc: '/images/pomme-baya.png'
    },
    {
      id: 'pure',
      flavor: 'Pure',
      rank: 19,
      imageSrc: '/images/pure.png'
    },
    {
      id: 'tangerine',
      flavor: 'Tangerine',
      rank: 20,
      imageSrc: '/images/tangerine.png'
    }
  ]
}

export default function rankingsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
