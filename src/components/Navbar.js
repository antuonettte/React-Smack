import React from 'react'
import 'react-bootstrap'
import { Link } from 'react-router-dom'
import logo from '../static/images/logo.png'
import '../static/css/nav.css'
import { useAuth } from '../context/AuthContext'



export const Navbar = () => {

    const {currentUser, signIn, signOut} = useAuth()

    const handleLogin = () => {
        signIn();
        console.log( 'Logged in successfully' )
    }

    return (
        <React.Fragment>

            <nav className="navbar fixed-top navbar-expand-sm navbar-dark">
                <Link to="/"><img className="navbar-brand " height="30px" alt="Smack Logo" src={logo} /></Link>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                    <ul className="navbar-nav ">
                        {/* <li className="nav-item ">
                            <Link className="nav-link" to="/">Home</Link>
                        </li> */}
                        {/* <li>
                            <Link className="nav-link" to="/settings">Settings</Link>
                        </li> */}
                        {
                            !currentUser.loggedIn
                                ?
                                <li>
                                    <Link onClick={() => handleLogin()} className="nav-link" to="">Login</Link>
                                </li>
                                :
                                <React.Fragment>
                                    <li>
                                        <Link onClick={() => signOut()} className="nav-link" to="">Logout</Link>
                                    </li>
                                    {/* <li>
                                        <Link className="nav-link" to="/auth/profile">Profile</Link>
                                    </li> */}
                                </React.Fragment>
                        }
                    </ul>

                </div>
            </nav>
        </React.Fragment>
    )
}
