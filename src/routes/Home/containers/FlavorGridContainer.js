import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { rankingsReorderItems, setUserId } from '../modules/rankings'
import { submitRankingData, getRankingData } from '../../../services/rankingsService'
import { DragDropContext } from 'react-dnd'
import flow from 'lodash.flow'
import HTML5Backend from 'react-dnd-html5-backend'
import Flavor from '../components/Flavor'
import Fingerprint2 from 'fingerprintjs2'

const mapDispatchToProps = {
  rankingsReorderItems,
  submitRankingData,
  getRankingData,
  setUserId
}

const mapStateToProps = (state) => ({
  rankings : state.rankings.rankings,
  userId: state.rankings.userId,
  hasRankedBefore: state.rankings.hasRankedBefore
})

class FlavorGridContainer extends React.Component {
  static propTypes = {
    rankings: PropTypes.array.isRequired,
    userId: PropTypes.string,
    hasRankedBefore: PropTypes.bool.isRequired,
    rankingsReorderItems: PropTypes.func.isRequired,
    submitRankingData: PropTypes.func.isRequired,
    getRankingData: PropTypes.func.isRequired,
    setUserId: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)

    this.moveFlavor = this.moveFlavor.bind(this)
    this.submitFlavorRankings = this.submitFlavorRankings.bind(this)

    new Fingerprint2().get((result, components) => {
      this.props.setUserId(result)
      this.props.getRankingData(this.props.userId)
    })
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
      userId: this.props.userId,
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
