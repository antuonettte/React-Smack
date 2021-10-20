import React from 'react'
import moment from 'moment'
import '../static/css/message.css'
import { useAuth } from '../context/AuthContext'


export const Message = (props) => {
    var m = props.m

    const { currentUser } = useAuth();

    const messageClass = m.userId === currentUser.id ? 'right' : 'left'

    return (
        <React.Fragment>
            <div className={`chat-message-${messageClass} d-flex pb-4`}>
                <div className="">
                    <img src={m.photoUrl} alt="" />
                </div>
                <div className="flex-shrink-1 bg-light rounded px-3 my-auto ml-3">
                    <div className="font-weight-bold mb-1 text-capitalize"><strong>{m.name}</strong></div>
                    {m.body}
                    <div className="text-muted small text-nowrap mt-2"> {moment(m.dateCreated.toDate()).fromNow()} </div>
                </div>
            </div>
        </React.Fragment>
    )
}
