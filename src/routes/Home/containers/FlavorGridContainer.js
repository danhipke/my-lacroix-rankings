import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { rankingsReorderItems } from '../modules/rankings'
import { DragDropContext } from 'react-dnd'
import flow from 'lodash.flow'
import HTML5Backend from 'react-dnd-html5-backend'
import Flavor from '../components/Flavor'

const mapDispatchToProps = {
  rankingsReorderItems
}

const mapStateToProps = (state) => ({
  rankings : state.rankings
})

class FlavorGridContainer extends React.Component {
  static propTypes = {
    rankings: PropTypes.object.isRequired,
    rankingsReorderItems: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)

    this.moveFlavor = this.moveFlavor.bind(this)
  }

  moveFlavor (startIndex, endIndex) {
    let reorderVal = {
      startIndex: parseInt(startIndex),
      endIndex: parseInt(endIndex)
    }
    this.props.rankingsReorderItems(reorderVal)
  }

  render () {
    return (
      <div>
        {this.props.rankings.rankings.map((ranking, i) => {
          return (
            <Flavor
              key={ranking.flavor}
              index={i}
              id={ranking.flavor}
              imageSrc={ranking.imageSrc}
              flavor={ranking.flavor}
              moveFlavor={this.moveFlavor} />
          )
        })}
      </div>
    )
  }
}

export default flow(
  DragDropContext(HTML5Backend),
  connect(mapStateToProps, mapDispatchToProps)
)(FlavorGridContainer)
