import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { Sidebar } from '../components/Sidebar'
import Profile from './Profile'
import Settings from './Settings'
import '../static/css/main.css'
import { Home } from './Home'
import { NotAuthenticated } from '../components/NotAuthenticated'
import { useAuth } from '../context/AuthContext'

export const Main = (props) => {

    const { currentUser } = useAuth()

    return (
        <React.Fragment>
            {
                !currentUser.loggedIn
                    ?
                    <NotAuthenticated />
                    :
                    <React.Fragment>
                        <header>
                            <Navbar />
                            <Sidebar />
                        </header>

                        <main>

                            <Switch>
                                <Route exact path="/" render={() => <Home key="home"/>} />
                                <Route path="/profile" render={() => <Profile />} />
                                <Route path="/settings" render={() => <Settings />} />
                            </Switch>

                        </main>


                        <footer></footer>
                    </React.Fragment>




            }
        </React.Fragment>
    )
}
