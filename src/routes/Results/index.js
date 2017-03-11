import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'results',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Results = require('./components/Results').default
      const resultsReducer = require('./modules/results').default

      /*  Add the reducers  */
      injectReducer(store, { key: 'results', reducer: resultsReducer })

      /*  Return getComponent   */
      cb(null, Results)

    /* Webpack named bundle   */
    }, 'results')
  }
})
