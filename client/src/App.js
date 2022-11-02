import React, {Component} from 'react';

import {useRoutes} from './routes'

import {connect} from 'react-redux'

class App extends Component {

  render() {
    const routes = useRoutes()

    return (
      <React.Fragment>
        {routes}
      </React.Fragment>
    )

  }

}



function mapStateToProps(state) {
  return {
    
  }
}

function mapDispatchToProps(dispatch) {
  return {
      
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)


