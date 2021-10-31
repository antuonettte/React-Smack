import React from 'react'
import '../static/css/notauth.css'
import { useAuth } from '../context/AuthContext'

export const NotAuthenticated = () => {

    const { signIn } = useAuth()

    return (
        <React.Fragment>
            <div className="auth">
                <div className="center">
                    <h1>Welcome to my Chat Application. This is a display of my skills <br /> 
                        and what I can do. This app is built fully using React and Firebase. It has database rules and is <br />
                        fully scallable.
                    </h1>
                    <h1 className="">Please Sign In to see the application.</h1>
                    <button className="w-100 btn btn-primary" onClick={signIn} >Sign In</button>
                </div>
            </div>
        </React.Fragment>
    )
}
