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
    const db = firebase.firestore();

    var fbProvider = new firebase.auth.FacebookAuthProvider();

    function signInWithFb(){
        return firebase.auth().setPersistence( firebase.auth.Auth.Persistence.LOCAL )
            .then(() => {
                firebase.auth().signInWithPopup( fbProvider )
                    .then(res => {
                        var u = res.user
                        console.log(u)

                        setCurrentUser({
                            id: u.uid,
                            name: u.displayName,
                            image: u.photoURL,
                            email: u.email,
                            loggedIn: true
                        });
                        // Finish Fixing the user photo url issure. 
                        db.collection('Users').doc(u.uid).set({
                            id: u.uid,
                            name: u.displayName,
                            image: u.photoURL,
                            email: u.email,
                        });

                        
                    })
                    .catch((err) => {
                        // var errorCode = err.code;
                        // var errorMessage = err.message;

                        // console.log(errorCode);
                        // console.log(errorMessage);
                        
                        // var email = err.email;
                        
                        // var credential = err.credential;
                    });
            })
    }

    function signIn(){
        return firebase.auth().setPersistence( firebase.auth.Auth.Persistence.LOCAL )
            .then(() => {
                firebase.auth().signInWithPopup(auth)
                    .then((res) => {
                        // var credential = res.credential;

                        // var token = credential.accessToken;

                        var u = res.user;
                        setCurrentUser({
                            id: u.uid,
                            name: u.displayName,
                            image: u.photoURL,
                            email: u.email,
                            loggedIn: true
                        });
                        
                        db.collection('Users').doc(u.uid).set({
                            id: u.uid,
                            name: u.displayName,
                            image: u.photoURL,
                            email: u.email,
                        });

                        db.collection('Users').doc(u.uid).collection('Groups').doc('Global').set({
                            name: 'Global'
                        })

                    
                    })
                    .catch((err) => {
                        var errorCode = err.code;
                        var errorMessage = err.message;

                        console.log(errorCode);
                        console.log(errorMessage);
                        
                        // var email = err.email;
                        
                        // var credential = err.credential;
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

                db.collection('Users').doc(u.uid).set({
                    id: u.uid,
                    name: u.displayName,
                    image: u.photoURL,
                    email: u.email
                });

            }else{
                setCurrentUser({
                    loggedIn: false
                })
            }
        } );

        return subscribe;

    }, []);

    const value = {
        currentUser, signIn, signOut, signInWithFb
    }

    return(

        <AuthContext.Provider value = { value } >
            {children}
        </AuthContext.Provider>

    )
}