import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import Statistics from '../pages/statistics'
import Home from '../pages/home'

export const useRoutes = (token, isAdmin) => {

        return (
            <Switch>

                <Route path='/statistics' render={(state) => {
                        return (
                            <Statistics state={state} />
                        )
                }} />

                <Route path='/' render={(state) => {
                        return (
                            <Home state={state} />
                        )
                }} />

                <Redirect to='/' />
            </Switch>
        )
    
}