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
    
    const [groups, setGroups] = useState([])

    const [currentGroup, setCurrentGroup] = useState('Group1')

    const { currentUser } = useAuth();
    const db = firebase.firestore();

    const addMessage = useCallback((messageData) => {
        db.collection('Groups').doc(currentGroup).collection('Messages').add(messageData.data)
            .then(docref => {
                console.log(' message sent successfully ')
            })
            .catch( err => {
                console.log('There was an error sending your message');
                console.log( err )
            } )
    }, [currentGroup]) 
// adds a firebase listener to the messages collection via onSnapshot()
// sets the listener to the unsubscribe keyword

    // const addGroup = (groupData) => {
    //     db.collection('Groups')
    // }


    const getGroups = useCallback(() => {
            var newGroups = [];
            db.collection('Groups').orderBy('dateCreated','asc').get()
                .then( (snapshot) => {
                    snapshot.forEach( group => {
                        newGroups.push({...group.data(), id: group.id})
                    })
                    setGroups(newGroups);
                })
                .catch( err => {
                    console.log(err)
                })

    }, [db]);

    //used to 
    useEffect(() => {
        let newMessages = []
        console.log(currentGroup)

        const unsubscribe = db.collection( 'Groups' ).doc(currentGroup).collection('Messages').orderBy('dateCreated','asc').onSnapshot((snapshot) => {
            newMessages = snapshot.docs.map(m =>({
                id: m.id,
                ...m.data()
            }))
            setMessages(newMessages)

        });

        return () => unsubscribe()
    }, [currentGroup])


    useEffect(() => {
        if (currentUser.loggedIn){
            getGroups();
        }
    }, [currentUser.loggedIn, getGroups]);

    
    return(
        <DataContext.Provider value = {{providerInfo: [messages, setMessages, groups],setCurrentGroup, currentGroup , addMessage, getGroups}} >
            { props.children }
        </DataContext.Provider>
    )
    
}