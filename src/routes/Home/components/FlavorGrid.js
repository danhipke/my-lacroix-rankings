import React, { PropTypes } from 'react'
import Flavor from './Flavor'
import './FlavorGrid.scss'

export const FlavorGrid = (props) => {
  const imageGrid = props.rankings.rankings.map((ranking, i) => {
    return (
      <Flavor
        key={i}
        index={i}
        imageSrc={ranking.imageSrc}
        flavor={ranking.flavor}
        moveFlavor={props.moveFlavor} />
    )
  })

  return (
    <div>
      {imageGrid}
    </div>
  )
}

FlavorGrid.propTypes = {
  rankings: PropTypes.object.isRequired,
  moveFlavor: PropTypes.func.isRequired
}

export default FlavorGrid
