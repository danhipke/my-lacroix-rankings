import React from 'react'
import './FlavorGrid.scss'

export const FlavorGrid = (props) => {
  const imageGrid = props.rankings.rankings.map((ranking, i) => {
    return <img
      key={i}
      id={i}
      alt={ranking.flavor}
      className='lacroix-flavor'
      src={ranking.imageSrc} />
  })

  return (
    <div className='flavor-grid' >
      {imageGrid}
    </div>
  )
}

FlavorGrid.propTypes = {
  rankings     : React.PropTypes.object.isRequired,
  rankingsReorderItems : React.PropTypes.func.isRequired
}

export default FlavorGrid
