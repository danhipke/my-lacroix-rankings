import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { XYPlot, XAxis, YAxis, HorizontalBarSeries } from 'react-vis'
import { getResults } from '../../../services/resultsService'

const mapDispatchToProps = {
  getResults
}

const mapStateToProps = (state) => ({
  rankingTotals : state.results.rankingTotals
})

class ResultsContainer extends React.Component {
  static propTypes = {
    rankingTotals: PropTypes.array,
    getResults: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)

    this.props.getResults()
  }

  render () {
    let visualizationData = this.props.rankingTotals.map((rankingTotal, i) => {
      return {
        y: rankingTotal.name,
        x: parseInt(rankingTotal.total),
        color: rankingTotal.color
      }
    })
    return (
      <XYPlot
        margin={{ left: 120 }}
        width={1000}
        height={600}
        colorType='literal'
        yType='ordinal'>
        <YAxis />
        <XAxis />
        <HorizontalBarSeries
          data={visualizationData} />
      </XYPlot>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultsContainer)
