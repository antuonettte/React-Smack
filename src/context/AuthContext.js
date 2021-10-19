import React, { useContext, useEffect, useState } from 'react'
import firebase from '../firebase'

// Empty Context for auth info
const AuthContext = React.createContext();


export function useAuth(){
    return useContext( AuthContext )
}

export const AuthProvider = ({children}) =>{
    // creates a way to set and get current user with the default state to no logged in user
    const [currentUser, setCurrentUser] = useState({loggedIn: false})

    var auth = new firebase.auth.GoogleAuthProvider();

    function signIn(){
        return firebase.auth().setPersistence( firebase.auth.Auth.Persistence.LOCAL )
            .then(() => {
                firebase.auth().signInWithPopup(auth)
                    .then((res) => {
                        var credential = res.credential;

                        var token = credential.accessToken;

                        var user = res.user;
                    })
                    .catch((err) => {
                        var errorCode = err.code;
                        var errorMessage = err.message;

                        var email = err.email;

                        var credential = err.credential;
                    });
            })
    }

    function signOut(){
        firebase.auth().signOut()
            .then(() => {
                console.log('Logged Out Successfully')
            })
            .catch( (error) => {
                console.log(error)
            } )
    }

    useEffect( () => {
        const subscribe = firebase.auth().onAuthStateChanged( u => {
            if ( u ){
                setCurrentUser({
                    id: u.uid,
                    name: u.displayName,
                    image: u.photoURL,
                    email: u.email,
                    loggedIn: true
                });
            }else{
                setCurrentUser({
                    loggedIn: false
                })
            }
        } );

        return subscribe;

    },[] );

    const value = {
        currentUser, signIn, signOut
    }

    return(

        <AuthContext.Provider value = { value } >
            {children}
        </AuthContext.Provider>

    )
}