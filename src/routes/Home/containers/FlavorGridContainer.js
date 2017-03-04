import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { rankingsReorderItems } from '../modules/rankings'
import { submitRankingData, getRankingData } from '../../../services/rankingsService'
import { DragDropContext } from 'react-dnd'
import flow from 'lodash.flow'
import HTML5Backend from 'react-dnd-html5-backend'
import Flavor from '../components/Flavor'

const mapDispatchToProps = {
  rankingsReorderItems,
  submitRankingData,
  getRankingData
}

const mapStateToProps = (state) => ({
  rankings : state.rankings.rankings,
  hasRankedBefore: state.rankings.hasRankedBefore
})

class FlavorGridContainer extends React.Component {
  static propTypes = {
    rankings: PropTypes.array.isRequired,
    hasRankedBefore: PropTypes.bool.isRequired,
    rankingsReorderItems: PropTypes.func.isRequired,
    submitRankingData: PropTypes.func.isRequired,
    getRankingData: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)

    this.moveFlavor = this.moveFlavor.bind(this)
    this.submitFlavorRankings = this.submitFlavorRankings.bind(this)
    this.props.getRankingData(1)
  }

  moveFlavor (startIndex, endIndex) {
    let reorderVal = {
      startIndex: parseInt(startIndex),
      endIndex: parseInt(endIndex)
    }
    this.props.rankingsReorderItems(reorderVal)
  }

  submitFlavorRankings () {
    let submitData = {
      userId: 1,
      hasRankedBefore: this.props.hasRankedBefore,
      rankings: this.props.rankings
    }
    this.props.submitRankingData(submitData)
  }

  render () {
    return (
      <div>
        <div>
          {this.props.rankings.map((ranking, i) => {
            return (
              <Flavor
                key={ranking.id}
                index={i}
                id={ranking.id}
                imageSrc={ranking.imageSrc}
                flavor={ranking.flavor}
                moveFlavor={this.moveFlavor} />
            )
          })}
        </div>
        <div>
          <button onClick={this.submitFlavorRankings}>
            Submit Rankings
          </button>
        </div>
      </div>
    )
  }
}

export default flow(
  DragDropContext(HTML5Backend),
  connect(mapStateToProps, mapDispatchToProps)
)(FlavorGridContainer)
