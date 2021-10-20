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
            group: 'Group1',
            data: {
                body: e.target.message.value,
                name: currentUser.name,
                dateCreated: firebase.firestore.Timestamp.fromDate(new Date()),
                userId: currentUser.id,
                photoUrl: currentUser.image
            }
        }
        document.querySelector('#input').value = "";
        addMessage(formData);
    }


    return (
        <React.Fragment>
            <div className="chat">
                        <div className="content">

                        {providerInfo[0].map((m) => <Message m={m} />)}

                        </div>
                        <div className=" message-box">
                            <form onSubmit={(e) => handleSubmit(e)} className="input-form">
                                    <textarea name="message" id="input" placeholder="What would you like to say?"></textarea>
                                    <button type="submit" className="submit"><i className="bi bi-arrow-up-circle"></i></button>
                            </form>
                        </div>
                    </div>
        </React.Fragment>
    )
}
