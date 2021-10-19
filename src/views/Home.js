import React, { Component, useContext, useRef, useEffect } from 'react'
import { Message } from '../components/Message'
import '../static/css/home.css'
import { DataContext } from '../context/DataProvider'
import { useAuth } from '../context/AuthContext'
import firebase from '../firebase'
import { NotAuthenticated } from '../components/NotAuthenticated'

export const Home = (props) => {

    const { currentUser } = useAuth()

    const { providerInfo, getMessages, addMessage } = useContext(DataContext)

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(providerInfo[0]);
        
        const formData = {
            body: e.target.message.value,
            name: currentUser.name,
            dateCreated: firebase.firestore.Timestamp.fromDate(new Date()),
            userId: currentUser.id
        }
        
        document.querySelector('#input').value = ""
        addMessage(formData)
    }

    const messagesEndRef = useRef(null)

    // const scrollToBottom = () =>{
    //     messagesEndRef.current.scrollIntoView({behavior: 'smooth'})
    // }

    useEffect(() =>{
        // messagesEndRef.current.scrollIntoView({behavior: 'smooth'})
    },[providerInfo[0]])

    return (
        <React.Fragment>
            {
                !currentUser.loggedIn
                    ?
                    <NotAuthenticated />
                    :
                    <div className="chat">
                        <div className="content">

                        {providerInfo[0].map((m) => <Message m={m} />)}

                        <div ref={messagesEndRef}></div>
                        
                        </div>
                        <div className=" message-box">
                            <form onSubmit={(e) => handleSubmit(e)} className="input-form">
                                    <textarea name="message" id="input" placeholder="What would you like to say?"></textarea>
                                    <button type="submit" className="submit"><i className="bi bi-arrow-up-circle"></i></button>
                            </form>
                        </div>
                    </div>



            }
        </React.Fragment>
    )
}
