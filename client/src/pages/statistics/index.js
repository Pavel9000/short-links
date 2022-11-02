import React, {Component} from 'react'
import classes from './index.module.css'
import Layout from '../../layouts/Layout'
import {connect} from 'react-redux'

class Home extends Component {

    state = {
        statistics_users: [],
        all_count: 0
    }

    async componentDidMount() {

        const url = `${this.props.config.url.isDev ? (this.props.config.url.dev.url+this.props.config.url.dev.serverPort) : this.props.config.url.url }/api/statistics`

        const response = await fetch(url)

        const json = await response.json()

        if ( json.statistics_users ) {
            let all_count = 0
            for (let i in json.statistics_users) {
                all_count = all_count + json.statistics_users[i].count
            }

            this.setState({ 
                statistics_users: json.statistics_users,
                all_count: all_count
            })
        } else {
            this.setState({ messageText: 'Ошибка' })
            return
        }

    }

    render() {
            return (
                <Layout>
                    <div className={classes.wrap} >
                        <div className={classes.wrap__window} >
                            <h2>Статистика</h2>
                            <h2>Всего редиректов: {this.state.all_count}</h2>
                            {
                                this.state.statistics_users.length !== 0
                                    ? <div>
                                        {
                                            this.state.statistics_users.map((obj, i) => {
                                                return (
                                                    <div className={classes.wrap__window__links__block} key={i}>
                                                            <div className={classes.wrap__window__links__block__long} >
                                                                { `id пользователя: ${obj.id}` }
                                                            </div>
                                                            <div className={classes.wrap__window__links__block__short} >
                                                                { `количество редиректов: ${obj.count}` }
                                                            </div>
                                                            <div className={classes.wrap__window__links__block__short} >
                                                                { `% от общего числа: ${Math.floor((obj.count/this.state.all_count)*100*100)/100}%` }
                                                            </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    : <p>Небыло ни одного редиректа</p>
                            }
                        </div>

                    </div>
                </Layout>
            )
        
    }
}

function mapStateToProps(state) {
    return {
        config: state.config
    }
}

function mapDispatchToProps(dispatch) {
    return {
    
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)