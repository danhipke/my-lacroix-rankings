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
    const reorderItem = state.dashboardItems[reorder.start]
    let newDashboardItems = []
    state.dashboardItems.map((item, i) => {
      if (i === reorder.start) {
        return
      }

      // we need the if statement because the behaviour
      // is determined if someone someone is dragging an
      // item from higher to lower place on the list or vice versa
      if (reorder.end < reorder.start) {
        if (i === reorder.end) {
          newDashboardItems.push(reorderItem)
        }
        newDashboardItems.push(item)
      } else {
        newDashboardItems.push(item)
        if (i === reorder.end) {
          newDashboardItems.push(reorderItem)
        }
      }
    })

    return Object.assign({}, state, {
      dashboardItems: newDashboardItems
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  rankings: [
    {
      flavor: 'Apricot',
      imageSrc: '/images/apricot.png'
    },
    {
      flavor: 'Berry',
      imageSrc: '/images/berry.png'
    },
    {
      flavor: 'Cerise Limón',
      imageSrc: '/images/cerise-limon.png'
    },
    {
      flavor: 'Coconut',
      imageSrc: '/images/coconut.png'
    },
    {
      flavor: 'Cran-Raspberry',
      imageSrc: '/images/cran-raspberry.png'
    },
    {
      flavor: 'Kiwi Sandía',
      imageSrc: '/images/kiwi-sandia.png'
    },
    {
      flavor: 'LaCola',
      imageSrc: '/images/lacola.png'
    },
    {
      flavor: 'Lemon',
      imageSrc: '/images/lemon.png'
    },
    {
      flavor: 'Lime',
      imageSrc: '/images/lime.png'
    },
    {
      flavor: 'Mango',
      imageSrc: '/images/mango.png'
    },
    {
      flavor: 'Melón Pomelo',
      imageSrc: '/images/melon-pomelo.png'
    },
    {
      flavor: 'Muré Pepino',
      imageSrc: '/images/mure-pepino.png'
    },
    {
      flavor: 'Orange',
      imageSrc: '/images/orange.png'
    },
    {
      flavor: 'Pamplemousse',
      imageSrc: '/images/pamplemousse.png'
    },
    {
      flavor: 'Passionfruit',
      imageSrc: '/images/passionfruit.png'
    },
    {
      flavor: 'Peach Pear',
      imageSrc: '/images/peach-pear.png'
    },
    {
      flavor: 'Piña Fraise',
      imageSrc: '/images/pina-fraise.png'
    },
    {
      flavor: 'Pomme Bayá',
      imageSrc: '/images/pomme-baya.png'
    },
    {
      flavor: 'Pure',
      imageSrc: '/images/pure.png'
    },
    {
      flavor: 'Tangerine',
      imageSrc: '/images/tangerine.png'
    }
  ]
}

export default function rankingsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
