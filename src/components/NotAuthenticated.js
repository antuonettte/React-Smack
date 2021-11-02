import React from 'react'
import '../static/css/notauth.css'
import { useAuth } from '../context/AuthContext'

export const NotAuthenticated = () => {

    const { signIn, signInWithFb } = useAuth()

    return (
        <React.Fragment>
            <div className="auth">
               <div className="container-fluid">
                   <div className="row">
                       <div className="col">
                           <h1 className="mt-5">Please Sign Into Smack</h1>
                           <button className="btn bg-white mt-5" onClick={signIn}><i className="bi bi-google"></i> Sign in using Google</button>
                           <button className="btn bg-white mt-5" onClick={signInWithFb}><i className="bi bi-facebook"></i> Continue with FaceBook</button>
                       </div>
                   </div>
               </div>
            </div>
        </React.Fragment>
    )
}
