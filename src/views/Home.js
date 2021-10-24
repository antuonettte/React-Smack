import React, { useContext, useEffect, } from 'react'
import { Message } from '../components/Message'
import '../static/css/home.css'
import { DataContext } from '../context/DataProvider'
import { useAuth } from '../context/AuthContext'
import firebase from '../firebase'
import '../context/DataProvider'




export const Home = (props) => {

    const { currentUser } = useAuth()

    const { providerInfo, getMessages, addMessage, currentGroup } = useContext(DataContext)

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(providerInfo[0]);
        const formData = {
            group: currentGroup,
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

    var messagesEnd;

    useEffect(() => {
        document.querySelector('#messagesEnd').scrollIntoView({behavior: 'smooth'})
    }, [providerInfo[0]])


    return (
        <React.Fragment>
            {/* <div className=""> */}
                <div id="content" className="content">

                    {providerInfo[0].map((m) => <Message m={m} key={m.userId} />)}

                    <div id="messagesEnd" ref={(el) => {messagesEnd = el;}}></div>
                </div>
                <div className="message-box">
                    <form onSubmit={(e) => handleSubmit(e)} className="input-form">
                        <textarea name="message" id="input" placeholder={` What would you like to say to ${currentGroup}?`}></textarea>
                        <button type="submit" className="submit"><i className="bi bi-arrow-up"></i></button>
                    </form>
                </div>
            {/* </div> */}
        </React.Fragment>
    )
}
