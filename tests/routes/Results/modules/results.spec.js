import { default as resultsReducer } from 'routes/Results/modules/results'

describe('(Redux Module) Results', () => {
  describe('(Reducer)', () => {
    it('Should be a function.', () => {
      expect(resultsReducer).to.be.a('function')
    })
    const defaultResults = {
      rankingTotals: []
    }

    it('Should initialize with a default state with empty rankingTotals array.', () => {
      expect(resultsReducer(undefined, {})).to.deep.equal(defaultResults)
    })

    it('Should return the previous state if an action was not matched.', () => {
      let state = resultsReducer(undefined, {})
      expect(state).to.deep.equal(defaultResults)
      state = resultsReducer(state, { type: '@@@@@@@' })
      expect(state).to.deep.equal(defaultResults)
    })
  })
})
