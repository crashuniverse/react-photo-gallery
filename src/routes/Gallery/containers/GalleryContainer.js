import { connect } from 'react-redux'
const request = require('superagent')

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the counter:   */

import Gallery from 'components/Gallery'

/*  Object of action creators (can also be function that returns object).
    Keys will be passed as props to presentational components. Here we are
    implementing our wrapper around increment; the component doesn't care   */

const mapActionCreators = {}

const mapStateToProps = (state) => ({
  counter: state.gallery
})

/*  Note: mapStateToProps is where you should use `reselect` to create selectors, ie:

    import { createSelector } from 'reselect'
    const counter = (state) => state.counter
    const tripleCount = createSelector(counter, (count) => count * 3)
    const mapStateToProps = (state) => ({
      counter: tripleCount(state)
    })

    Selectors can compute derived data, allowing Redux to store the minimal possible state.
    Selectors are efficient. A selector is not recomputed unless one of its arguments change.
    Selectors are composable. They can be used as input to other selectors.
    https://github.com/reactjs/reselect    */

const UNSPLASH_CLIENT_ID = '8f113d7ffc06c7a8f4c8a397dd5b1fd01d884211225ba623ca4a9d4c96097572'
const SEARCH_QUERY = 'paris'

request
.get('https://api.unsplash.com/photos/search/')
.query({
  'client_id': UNSPLASH_CLIENT_ID,
  'query': SEARCH_QUERY
})
.end((err, res) => {
  console.log('error is: ', err)
  console.log('response is: ', res && res.body)
})

export default connect(mapStateToProps, mapActionCreators)(Gallery)
