import { GET_RANKINGS_ERROR,
        GET_RANKINGS_SUCCESS,
        GET_RANKINGS_DOESNT_EXIST,
        SUBMIT_RANKINGS_ERROR,
        SUBMIT_RANKINGS_SUCCESS } from '../../../services/rankingsService'

// ------------------------------------
// Constants
// ------------------------------------
export const REORDER_FLAVOR = 'REORDER_FLAVOR'

// ------------------------------------
// Actions
// ------------------------------------
export function reorderFlavor (value) {
  return {
    type: REORDER_FLAVOR,
    payload: value
  }
}

export const actions = {
  reorderFlavor
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [REORDER_FLAVOR]: (state, action) => {
    const reorder = action.payload
    const flavorToReorder = state.flavors[reorder.startIndex]
    let newFlavors = []
    state.flavors.map((flavor, i) => {
      if (i === reorder.startIndex) {
        return
      }

      if (reorder.endIndex < reorder.startIndex) {
        if (i === reorder.endIndex) {
          newFlavors.push(flavorToReorder)
        }
        newFlavors.push(flavor)
      } else {
        newFlavors.push(flavor)
        if (i === reorder.endIndex) {
          newFlavors.push(flavorToReorder)
        }
      }
    })

    newFlavors = newFlavors.map((item, i) => {
      return Object.assign({}, item, {
        oldRank: item.rank,
        rank: i + 1 })
    })

    return Object.assign({}, state, {
      flavors: newFlavors
    })
  },
  [GET_RANKINGS_SUCCESS]: (state, action) => {
    const flavors = action.payload.flavors

    let newFlavors = flavors.map((flavor) => (
      {
        id: flavor.id,
        name: flavor.name,
        rank: flavor.rank,
        imageSrc: flavor.image_src
      }
    )).sort((a, b) =>
      a.rank - b.rank
    )

    return Object.assign({}, state, {
      hasRankedBefore: true,
      flavors: newFlavors
    })
  },
  [GET_RANKINGS_ERROR]: (state, action) => {
    // TODO: Handle this error
    return state
  },
  [GET_RANKINGS_DOESNT_EXIST]: (state, action) => {
    return Object.assign({}, state, {
      hasRankedBefore: false
    })
  },
  [SUBMIT_RANKINGS_ERROR]: (state, action) => {
    // TODO: Handle this error
    return state
  },
  [SUBMIT_RANKINGS_SUCCESS]: (state, action) => {
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
  // For now, leave default rankings here. May be worth loading from DB at some
  // point, but this will minimize DB queries
  flavors: [
    {
      id: 'apricot',
      name: 'Apricot',
      rank: 1,
      imageSrc: '/images/apricot.png'
    },
    {
      id: 'berry',
      name: 'Berry',
      rank: 2,
      imageSrc: '/images/berry.png'
    },
    {
      id: 'cerise-limon',
      name: 'Cerise Limón',
      rank: 3,
      imageSrc: '/images/cerise-limon.png'
    },
    {
      id: 'coconut',
      name: 'Coconut',
      rank: 4,
      imageSrc: '/images/coconut.png'
    },
    {
      id: 'cran-raspberry',
      name: 'Cran-Raspberry',
      rank: 5,
      imageSrc: '/images/cran-raspberry.png'
    },
    {
      id: 'kiwi-sandia',
      name: 'Kiwi Sandía',
      rank: 6,
      imageSrc: '/images/kiwi-sandia.png'
    },
    {
      id: 'lacola',
      name: 'LaCola',
      rank: 7,
      imageSrc: '/images/lacola.png'
    },
    {
      id: 'lemon',
      name: 'Lemon',
      rank: 8,
      imageSrc: '/images/lemon.png'
    },
    {
      id: 'lime',
      name: 'Lime',
      rank: 9,
      imageSrc: '/images/lime.png'
    },
    {
      id: 'mango',
      name: 'Mango',
      rank: 10,
      imageSrc: '/images/mango.png'
    },
    {
      id: 'melon-pomelo',
      name: 'Melón Pomelo',
      rank: 11,
      imageSrc: '/images/melon-pomelo.png'
    },
    {
      id: 'mure-pepino',
      name: 'Muré Pepino',
      rank: 12,
      imageSrc: '/images/mure-pepino.png'
    },
    {
      id: 'orange',
      name: 'Orange',
      rank: 13,
      imageSrc: '/images/orange.png'
    },
    {
      id: 'pamplemousse',
      name: 'Pamplemousse',
      rank: 14,
      imageSrc: '/images/pamplemousse.png'
    },
    {
      id: 'passionfruit',
      name: 'Passionfruit',
      rank: 15,
      imageSrc: '/images/passionfruit.png'
    },
    {
      id: 'peach-pear',
      name: 'Peach Pear',
      rank: 16,
      imageSrc: '/images/peach-pear.png'
    },
    {
      id: 'pina-fraise',
      name: 'Piña Fraise',
      rank: 17,
      imageSrc: '/images/pina-fraise.png'
    },
    {
      id: 'pomme-baya',
      name: 'Pomme Bayá',
      rank: 18,
      imageSrc: '/images/pomme-baya.png'
    },
    {
      id: 'pure',
      name: 'Pure',
      rank: 19,
      imageSrc: '/images/pure.png'
    },
    {
      id: 'tangerine',
      name: 'Tangerine',
      rank: 20,
      imageSrc: '/images/tangerine.png'
    }
  ]
}

export default function rankingsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
