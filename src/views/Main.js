import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { Sidebar } from '../components/Sidebar'
import Profile from './Profile'
import Settings from './Settings'
import '../static/css/main.css'
import { Home } from './Home'

export const Main = (props) => {
    return (
        <React.Fragment>
            <header>
                <Navbar />
                <Sidebar />
            </header>

            <main>

            <Switch>
                <Route exact path="/"   render={ () => <Home />}/> 
                <Route path="/profile"  render={ () => <Profile />}/> 
                <Route path="/settings" render={ () => <Settings />}/> 
            </Switch>

            </main>
            
            
            <footer
            ></footer>
        </React.Fragment>
    )
}
