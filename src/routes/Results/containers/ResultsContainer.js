import React, { PropTypes } from 'react'
import Result from '../components/Result'
import { connect } from 'react-redux'
import {XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalGridLines, HorizontalBarSeries } from 'react-vis'
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
        height: 10
      }
    })
    return (
      <div>
        <XYPlot
          width={1000}
          height={600}
          yType='ordinal'
          yRange={[-10, 600 - 40]}>
          <HorizontalGridLines />
          <VerticalGridLines />
          <HorizontalBarSeries
            data={visualizationData} />
          <YAxis />
          <XAxis />

        </XYPlot>
        {this.props.rankingTotals.map((rankingTotal, i) => {
          return (
            <Result
              key={rankingTotal.id}
              total={rankingTotal.total}
              flavor={rankingTotal.name} />
          )
        })}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultsContainer)
