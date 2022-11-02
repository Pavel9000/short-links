import React, {Component} from 'react'
import classes from './index.module.css'

import {connect} from 'react-redux'


class Layout extends Component {

    state = {
        
    }

    componentDidMount() {
        
    }

    render() {
        
        return (
            <div className={classes.Layout}>
                   
                <main>
                    { this.props.children }
                </main>
                
            </div>
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(Layout)