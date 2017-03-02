import React, { PropTypes } from 'react'
import Flavor from './Flavor'

export const FlavorGrid = (props) => {
  return (
    <div>
      {props.rankings.rankings.map((ranking, i) => {
        return (
          <Flavor
            key={i}
            index={i}
            imageSrc={ranking.imageSrc}
            flavor={ranking.flavor}
            moveFlavor={props.moveFlavor} />
        )
      })}
    </div>
  )
}

FlavorGrid.propTypes = {
  rankings: PropTypes.object.isRequired,
  moveFlavor: PropTypes.func.isRequired
}

export default FlavorGrid
