import ResultsRoute from 'routes/Results'

describe('(Route) Results', () => {
  let _route

  beforeEach(() => {
    _route = ResultsRoute({})
  })

  it('Should return a route configuration object', () => {
    expect(typeof _route).to.equal('object')
  })

  it('Configuration should contain path `results`', () => {
    expect(_route.path).to.equal('results')
  })
})
