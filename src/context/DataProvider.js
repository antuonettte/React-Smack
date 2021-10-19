import React, { useEffect, useState, createContext, useCallback, useRef } from 'react';
import firebase from '../firebase';
import { useAuth } from './AuthContext';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

export const DataContext = createContext();

export const DataProvider = ( props ) => {

    const [messages, setMessages] = useState([]); //passing in a direct value like an empty array, it will reset that array
    // every time the dataprovider component is ran, if the array was a complext algorithm or math, it could hurt the performace of my app
    // use state can also accept an arrow function which will only run on the first initial render of our component.
    const { currentUser } = useAuth();
    const db = firebase.firestore();

    const addMessage = (messageData) => {
        db.collection('Messages').add(messageData)
            .then(docref => {
                console.log(' message sent successfully ')
            })
            .catch( err => {
                console.log('There was an error sending your message');
                console.log( err )
            } )
    }
// adds a firebase listener to the messages collection via onSnapshot()
// sets the listener to the unsubscribe keyword
    useEffect(() => {
        let newMessages = []

        const unsubscribe = db.collection( 'Messages' ).orderBy('dateCreated','asc').onSnapshot((snapshot) => {
            console.log(snapshot)
            newMessages = snapshot.docs.map(m =>({
                id: m.id,
                ...m.data()
            }))
            setMessages(newMessages)

        });

        return () => unsubscribe()
    }, [])

    
    return(
        <DataContext.Provider value = {{providerInfo: [messages, setMessages], addMessage}} >
            { props.children }
        </DataContext.Provider>
    )
    
}