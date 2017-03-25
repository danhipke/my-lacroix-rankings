import HomeRoute from 'routes/Home'

describe('(Route) Home', () => {
  let _route

  beforeEach(() => {
    _route = HomeRoute({})
  })

  it('Should return a route configuration object', () => {
    expect(typeof _route).to.equal('object')
  })

  it('Should not have path defined (index route).', () => {
    expect(_route.path).to.equal(undefined)
  })
})
