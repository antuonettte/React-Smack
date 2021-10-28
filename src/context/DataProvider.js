import React, { useEffect, useState, createContext, useCallback } from 'react';
import firebase from '../firebase';
import { useAuth } from './AuthContext';
import { scroll } from '../views/Home.js'

export const DataContext = createContext();

export const DataProvider = ( props ) => {

    const [messages, setMessages] = useState([]); //passing in a direct value like an empty array, it will reset that array
    // every time the data     provider component is ran, if the array was a complext algorithm or math, it could hurt the performace of my app
    // use state can also accept an arrow function which will only run on the first initial render of our component.
    
    const [groups, setGroups] = useState([])

    const [currentGroup, setCurrentGroup] = useState('Global')

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
    }, [currentGroup, db]) 
// adds a firebase listener to the messages collection via onSnapshot()
// sets the listener to the unsubscribe keyword

    const createGroup = (groupData) => {
        db.collection('Groups').doc(groupData.name).set({name: groupData.name});
        db.collection('Users').doc(currentUser.id).collection('Groups').doc(groupData.name).set({name: groupData.name});
        setCurrentGroup(groupData.name);
    }


    const getGroups = useCallback(() => {
            var newGroups = [];
            db.collection('Users').doc(currentUser.id).collection('Groups').get()
                .then( (snapshot) => {
                    snapshot.forEach( group => {
                        newGroups.push({...group.data(), id: group.id})
                    })
                    setGroups(newGroups);
                })
                .catch( err => {
                    console.log(err)
                })
                // console.log(groups)
                
    }, [db, currentUser, currentGroup]);

    // adds a firebase listener to the messages collection via onSnapshot()
    // sets the listener to the unsubscribe keyword
    useEffect(() => {
        let newMessages = []
        // collection( 'Users' ).doc(currentUser.id) V
        const unsubscribe = db.collection('Groups').doc(currentGroup).collection('Messages').orderBy('dateCreated','asc').onSnapshot((snapshot) => {
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
        <DataContext.Provider value = {{providerInfo: [messages, setMessages, groups], setCurrentGroup, currentGroup, addMessage, getGroups, createGroup}} key={'key'}>
            { props.children }
        </DataContext.Provider>
    )
    
}