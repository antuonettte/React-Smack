import React from 'react'
import '../static/css/notauth.css'
import { useAuth } from '../context/AuthContext'

export const NotAuthenticated = () => {

    const { signIn } = useAuth()

    return (
        <React.Fragment>
            <div className="auth">
                <div className="center">
                    <h1 className="">Please Sign In</h1>
                    <button className="w-100 btn btn-primary" onClick={signIn} >Sign In</button>
                </div>
            </div>
        </React.Fragment>
    )
}
