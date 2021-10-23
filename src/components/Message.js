import React from 'react'
import moment from 'moment'
import '../static/css/message.css'
import { useAuth } from '../context/AuthContext'
import 'bootstrap/dist/css/bootstrap.min.css'


export const Message = (props) => {
    var m = props.m

    const { currentUser } = useAuth();
    
    // ${messageClass} <--- use this to change the chat to align-right for users messages
    const messageClass = m.userId === currentUser.id ? 'right' : 'left'

    return (
        <React.Fragment>
            <div className={` chat-message-${messageClass} d-flex pb-4`}>
                <div className="">
                    <img className="rounded img-fluid" width="50px" src={m.photoUrl} alt="" />
                </div>
                <div className="flex-shrink-1 bg-light sortaRounded px-3 my-auto ml-3">
                    <div className="info">
                        <div className="font-weight-bold mb-1 text-capitalize"><strong>{m.name} <cite className="text-muted time text-nowrap"> {moment(m.dateCreated.toDate()).fromNow()} </cite></strong></div>
                        
                    </div>
                    {m.body}
                </div>
            </div>
        </React.Fragment>
    )
}
